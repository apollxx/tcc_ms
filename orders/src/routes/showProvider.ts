import { Router, Request, Response } from "express";
import { Types } from "mongoose";
import { currentUser, requireAuth, authClient } from "@apollxx_tcc/common";
import { Order } from "../models/order";

const router = Router();
router.get("/api/orders/client/:providerId", currentUser, requireAuth, authClient, async (req: Request, res: Response) => {
    const clientId = req.currentUser!.id;
    let providerId = new Types.ObjectId(req.params.providerId);

    const order = await Order.findByClientProvider(clientId, providerId)

    res.status(200).send(order)
})

export { router as showOrderUserRouter }