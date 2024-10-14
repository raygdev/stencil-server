import { User } from "../../models/user-model";
import { Request, Response } from "express";
import bcrypt from 'bcrypt'

export interface ICreateUserRequest {
    firstName: string,
    lastName: string,
    password: string,
    email: string
}

export const create = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body as ICreateUserRequest

    const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password,10)
    })
    await newUser.save()
    const user = newUser.toJSON()
    delete user.password
    res.status(201).json(user)
}