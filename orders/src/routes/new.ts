import { Router, Request, Response } from "express";
import { currentUser, requireAuth, authClient, validateRequest, isObjectId, OrderStatus, BadRequestError } from "@apollxx_tcc/common";
import { body } from "express-validator";
import { Order } from "../models/order";
import { Product } from "../models/product";

const router = Router();

router.post("/api/orders", currentUser, requireAuth, authClient, [
    body("providerId")
        .notEmpty()
        .custom(isObjectId)
        .withMessage("ProviderId must be an ObjectId"),
    body("productId")
        .notEmpty()
        .custom(isObjectId)
        .withMessage("ProductId must be an ObjectId"),
    body("amount")
        .isInt({ min: 1, max: 100 })
        .withMessage("amount must be a int number greater or equal to 1")
], validateRequest, async (req: Request, res: Response) => {
    const { providerId, productId, amount, providerName } = req.body
    const clientId = req.currentUser!.id

    const foundedOrder = await Order.findByClientProvider(clientId, providerId)
    if (foundedOrder) throw new BadRequestError("client have an open order with this provider")

    const product = await Product.findById(productId);
    if (!product) throw new BadRequestError("invalid product id")
    const { title, price } = product

    const order = Order.build({
        clientId,
        providerId,
        providerName,
        products: [{
            id: product.id,
            title: title,
            price: price,
            amount: amount,
        }],
        status: OrderStatus.Shopping
    })

    order.save()

    res.status(201).send(order)
})

export { router as newOrderRouter }