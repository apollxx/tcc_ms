import express, { Request, Response } from "express";
import { body } from 'express-validator';
import { Roles } from "@apollxx_tcc/common"
import { validateRequest, BadRequestError } from "@apollxx_tcc/common";
import { User } from "../models/user";
import { genUserJwt } from "../services/gen-user-jwt";


const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage("Password must be between 4 and 20 characters"),
    body("role")
        .trim()
        .isIn([Roles.Client, Roles.Provider])
        .withMessage("Role must be an Enum of Roles"),
    body("name")
        .notEmpty()
        .withMessage("You must supply a name")
], validateRequest,
    async (req: Request, res: Response) => {

        const { email, password, role, name, phone, address } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) throw new BadRequestError("Email in use")

        const user = User.build({ email, password, role, name, phone, address });
        await user.save();

        // Generate JWT
        const userJwt = genUserJwt(user)

        // Store it on session
        req.session = {
            jwt: userJwt
        };

        res.status(201).send(user);
    });

export { router as signupRouter };