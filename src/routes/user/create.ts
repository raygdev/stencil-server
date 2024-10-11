import { User } from "../../models/user-model";
import { Request, Response, Router } from "express";
import bcrypt from 'bcrypt'

interface ICreateUserRequest {
    firstName: string,
    lastName: string,
    password: string,
    email: string
}


export const create = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body as ICreateUserRequest

    const user = await User.create({
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password,10)
    })
    await user.save()
    res.json(user.toJSON())
}