import { NotAuthorizedError, NotFoundError } from "../../errors";
import { Post } from "../../models/posts-model";
import { Request, Response } from "express";

/**
 * @swagger
 * /api/posts/new:
 *   delete:
 *     summary: "Delete the post belonging to the requesting user"
 *     tags:
 *       - Posts
 *     description: "requires authentication via JWT. Performs a soft delete for the posts"
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
 *       204:
 *        description:
 *          No content is sent on success
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

export const deletePost = async (req: Request, res: Response) => {
    const { id } = req.params

    const post = await Post.findOne({ where: { id } })

    if(!post) throw new NotFoundError()

    if(post.toJSON().userId !== req.user!.id) throw new NotAuthorizedError()

    await post.destroy()

    res.status(204).send()
}