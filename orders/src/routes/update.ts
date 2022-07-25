import mongoose from "mongoose";
import { Router, Request, Response } from "express";
import { currentUser, requireAuth, authClient, validateRequest, isObjectId, BadRequestError, OrderStatus } from "@apollxx_tcc/common";
import { body } from "express-validator";
import { Order } from "../models/order";
import { Product } from "../models/product";

const router = Router();

router.put("/api/orders", currentUser, requireAuth, authClient, [
    body("providerId")
        .notEmpty()
        .custom(isObjectId)
        .withMessage("ProviderId must be an ObjectId"),
    body("productId")
        .notEmpty()
        .custom(isObjectId)
        .withMessage("ProductId must be an ObjectId"),
    body("amount")
        .isInt({ min: 0, max: 100 })
        .withMessage("amount must be a int number greater or equal to 0")
], validateRequest, async (req: Request, res: Response) => {
    const { providerId, productId, amount } = req.body
    const clientId = req.currentUser!.id

    const foundedOrder = await Order.findByClientProvider(clientId, providerId)
    if (!foundedOrder) throw new BadRequestError("client must have a open order for this provider")

    const product = await Product.findById(productId);
    if (!product) throw new BadRequestError("invalid product id")
    const { title, price } = product

    // search for productId in foundedOrder
    const orderPosition = foundedOrder.products.findIndex(p => p.id.toString() === productId)
    if (orderPosition > -1) {
        // update the amount
        foundedOrder.products[orderPosition].amount = amount;
    } else {
        // add new product to array
        foundedOrder.products.push({
            id: productId,
            title: title,
            price: price,
            amount: amount
        })
    }

    if (amount === 0) {
        // if amount is 0, remove product from array
        foundedOrder.products.splice(orderPosition, 1)
    }

    //@ts-ignore
    if (foundedOrder.products.length === 0) {
        foundedOrder.status = OrderStatus.Cancelled
    }

    await foundedOrder.save()
    res.status(200).send(foundedOrder)
})

export { router as updateOrderRouter }