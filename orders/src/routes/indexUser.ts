import { Router, Request, Response } from "express";
import { currentUser, requireAuth, OrderStatus, isOfEnum, BadRequestError, Roles } from "@apollxx_tcc/common";
import { Order } from "../models/order";

const router = Router();
router.get("/api/orders/user/:status", currentUser, requireAuth, async (req: Request, res: Response) => {
    const userId = req.currentUser!.id;
    let status = req.params.status;

    let foundedOrder;
    // provider in only allowed to view completed orders
    if (req.currentUser!.role === Roles.Provider) status = OrderStatus.Completed

    if (status.toLowerCase() === "all") {
        // only client may access this
        foundedOrder = await Order.find({ userId });
    } else {
        const isStatusEnum = isOfEnum(status.toLowerCase(), OrderStatus);
        if (!isStatusEnum) throw new BadRequestError("status must be one of types OrderStatus");
        foundedOrder = await Order.find({ userId, status });
    }

    res.status(200).send(foundedOrder);
})

export { router as indexOrderUserRouter }