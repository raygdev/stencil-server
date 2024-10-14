import { Request, Response } from "express";
import { Post } from "../../models/posts-model";
import { NotFoundError } from "../../errors";

/**
 * @swagger
 * /api/posts/get:
 *   get:
 *     summary: "Get all of the requesting user's posts"
 *     tags:
 *       - Posts
 *     description: "requires authentication via JWT"
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token for authorization
 *     security:
 *       -BearerAuth: []
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Post"
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

export const get = async (req: Request, res: Response) => {
  const posts = await Post.findAll({ where:{ userId: req.user!.id} })

  if(!posts) throw new NotFoundError()

  res.status(200).json(posts)
}