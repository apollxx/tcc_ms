
import { Message } from "node-nats-streaming"
import { Subjects, Listener, ProductCreated } from "@apollxx_tcc/common"
import { Product } from "../../models/product"
import { queuGroupName } from "./queue-group-name";

export class ProductCreatedListener extends Listener<ProductCreated>{
    subject: Subjects.ProductCreated = Subjects.ProductCreated;
    queueGroupName: string = queuGroupName;

    async onMessage(data: ProductCreated['data'], msg: Message) {
        const { id, providerId, title, price } = data
        const product = Product.build({
            _id: id, providerId, title, price
        })
        await product.save()

        msg.ack();
    }
}