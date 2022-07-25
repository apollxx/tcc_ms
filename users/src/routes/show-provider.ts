import mongoose from "mongoose"
import { Router, Request, Response } from "express"
import { BadRequestError } from "@apollxx_tcc/common";
import { User } from "../models/user"

const router = Router()

router.get('/api/users/providers/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestError("id param must be of type ObjectId");
    const foundedProvider = await User.findById(id);
    res.status(200).send(foundedProvider);
})

export { router as showProviderRouter }