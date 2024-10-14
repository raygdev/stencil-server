import { Post } from "../../models/posts-model";
import { Request, Response } from "express";

/**
 * @swagger
 * /api/posts/new:
 *   post:
 *     summary: Create a user
 *     tags:
 *       - Posts
 *     description: Creates a new user
 *     parameters:
 *       - in: headers
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token for authorization
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - note
 *             properties:
 *               note:
 *                 type: string
 *                 description: "The post body to be saved"
 *                 example: "Some post body"
 *     responses:
 *       201:
 *         description: Successful response with the new user's details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       401:
 *         description: Not authorized error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: "Not Authorized error"
 *               properties:
 *                 errors:
 *                   $ref: "#/components/schemas/NotAuthorizedError"
 *       400:
 *         description: A failed validation or unknown error response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: "Validation errors related to malformed or missing fields"
 *               properties:
 *                 errors:
 *                   $ref: "#/components/schemas/PostValidationError"
 *                 
 *                
 */

export const create = async (req: Request, res: Response) => {
    const post = await Post.create({
        note: req.body.note,
        userId: req.user!.id
    })

    await post.save()

    res.status(200).json(post.toJSON())

}