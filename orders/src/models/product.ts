import mongoose from "mongoose";

interface ProductAttrs {
    _id: string;
    providerId: string;
    title: string;
    price: number;
}

interface ProductDoc extends mongoose.Document {
    providerId: string;
    title: string;
    price: number;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
    build(attrs: ProductAttrs): ProductDoc
}

const productSchema = new mongoose.Schema({
    providerId: {
        type: mongoose.Types.ObjectId,
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
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
            delete ret.__v;
        }
    }
})


productSchema.statics.build = (attrs: ProductAttrs) => {
    return new Product(attrs);
};

const Product = mongoose.model<ProductDoc, ProductModel>('Product', productSchema);

export { Product };