import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest, currentUser, requireAuth, authProvider } from "@apollxx_tcc/common";
import { Product } from "../models/product";
import { ProductCreatedPublisher } from "../events/publishers/product-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = Router()

router.post("/api/products", currentUser, requireAuth, authProvider, [
    body("title")
        .notEmpty()
        .withMessage("must supply a title"),
    body("price")
        .isNumeric()
        .withMessage("must supply a price")
], validateRequest, async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const providerId = req.currentUser!.id

    const product = Product.build({ title, price, providerId })
    await product.save()
    new ProductCreatedPublisher(natsWrapper.client).publish({
        id: product.id,
        providerId: product.providerId.toHexString(),
        price: product.price,
        title: product.title
    })

    res.status(201).send(product)
})

export { router as newProductRouter }