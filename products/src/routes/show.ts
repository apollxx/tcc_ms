import mongoose from "mongoose"
import { Router, Request, Response } from "express";
import { BadRequestError } from "@apollxx_tcc/common";
import { Product } from "../models/product";

const router = Router()

router.get("/api/products/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestError("id param must be of type ObjectId")
    const product = await Product.findById(id)

    res.status(200).send(product)
})

export { router as showProductRouter }