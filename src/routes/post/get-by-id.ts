import { NotAuthorizedError, NotFoundError } from "../../errors";
import { Post } from "../../models/posts-model";
import { Request, Response } from "express";

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: "Get a post belonging to a user by ID"
 *     tags:
 *       - Posts
 *     description: "requires authentication via JWT."
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token for authorization
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the post to delete
 *     security:
 *       -BearerAuth: []
 *     responses:
 *       200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#components/schemas/Post"
 * 
 *       401:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   $ref: "#components/schemas/NotAuthorizedError"
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                errors:
 *                  $ref: "#components/schemas/NotFoundError"
 *     
 */

export const getById = async (req: Request, res: Response) => {
    const { id } = req.params

    const post = (await Post.findOne({ where: { id }}))?.toJSON()

    if(!post) throw new NotFoundError()

    if(post.userId !== req.user!.id) throw new NotAuthorizedError()

    res.status(200).json(post)
}