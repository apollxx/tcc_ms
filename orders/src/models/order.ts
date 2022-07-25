import mongoose from 'mongoose'
import { Types } from 'mongoose'
import { OrderStatus } from "@apollxx_tcc/common"

export interface OrderAttrs {
    clientId: Types.ObjectId,
    providerId: Types.ObjectId,
    providerName: string;
    products: [{
        id: Types.ObjectId,
        title: string,
        price: number,
        amount: number
    }]
    status: OrderStatus
}

interface OrderDoc extends mongoose.Document {
    clientId: Types.ObjectId,
    providerId: Types.ObjectId,
    providerName: string
    products: [{
        id: Types.ObjectId,
        title: string,
        price: number,
        amount: number
    }]
    status: OrderStatus
}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc;
    findByClientProvider(clientId: Types.ObjectId, providerId: Types.ObjectId): Promise<OrderDoc | null>
}

const orderSchema = new mongoose.Schema({
    clientId: {
        type: Types.ObjectId,
        required: true
    },
    providerId: {
        type: Types.ObjectId,
        required: true
    },
    providerName: {
        type: String,
        required: true
    },
    products: [{
        id: {
            type: Types.ObjectId,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
    }],
    status: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
            delete ret.__v;
        }
    }
})

orderSchema.statics.findByClientProvider = async function (clientId: Types.ObjectId, providerId: Types.ObjectId) {
    const order = await Order.findOne({ clientId, providerId, status: OrderStatus.Shopping })
    return order
}

orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order(attrs);
}

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema)

export { Order }