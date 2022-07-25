import { Router, Request, Response } from "express";
import { Types } from "mongoose";
import { currentUser, requireAuth, authClient, BadRequestError, OrderStatus } from "@apollxx_tcc/common";
import { Order } from "../models/order";

const router = Router();
router.put("/api/orders/:id/completed", currentUser, requireAuth, authClient, async (req: Request, res: Response) => {
    let orderId = new Types.ObjectId(req.params.id);

    const order = await Order.findById(orderId)
    if (!order) throw new BadRequestError("Order not found")
    order.status = OrderStatus.Completed

    await order.save();

    res.status(200).send(order)
})

export { router as orderUpdateCompleted }