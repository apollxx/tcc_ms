import { Router, Request, Response } from "express"
import { Roles } from "@apollxx_tcc/common"
import { User } from "../models/user"

const router = Router()

router.get('/api/users/providers', async (req: Request, res: Response) => {
    const providers = await User.find({ role: Roles.Provider });
    res.status(200).send(providers);
})

export { router as indexProviderRouter }