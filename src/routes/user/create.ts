import { User } from "../../models/user-model";
import { Request, Response } from "express";
import bcrypt from 'bcrypt'

export interface ICreateUserRequest {
    firstName: string,
    lastName: string,
    password: string,
    email: string
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       description: "returned user object on successful creation"
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         firstName:
 *           type: string
 *           example: "John"
 *         lastName:
 *           type: string
 *           example: "Smith"
 *         email:
 *           type: string
 *           example: john.smith@yahoo.com
 *         createdAt:
 *           type: Date
 *           example: "2024-10-12T17:57:39.217Z"
 *         updatedAt:
 *           type: Date
 *           example: "2024-10-12T17:57:39.217Z"
 *         deletedAt:
 *           type: Date || null
 *           example: null
 *     ValidationErrors:
 *       type: object
 *       description: "an array of failed validations for missing or malformed fields"
 *       properties:
 *         message:
 *          type: string
 *          description: "reason why the field failed validation"
 *         field:
 *           type: string
 *           description: "the field that failed validation"
 *       example:
 *         - message: "email must be provided"
 *           field: "email"
 *         - message: "first name must be provided"
 *           field: "firstName"
 *         - message: "last name must be provided"
 *           field: "lastName"
 *         - message: "password must be provided"
 *           field: "password"
 */

/**
 * @swagger
 * /api/users/create:
 *   post:
 *     summary: Create a user
 *     description: Creates a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First name of the user
 *               lastName:
 *                 type: string
 *                 description: Last name of the user
 *               email:
 *                 type: string
 *                 description: The user's valid email address
 *               password:
 *                 type: string
 *                 description: The password for the user's account
 *     responses:
 *       201:
 *         description: Successful response with the new user's details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       400:
 *         description: A failed validation or unknown error response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: "Validation errors related to malformed or missing fields"
 *               properties:
 *                 errors:
 *                   $ref: "#/components/schemas/ValidationErrors"
 *                 
 *                
 */


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