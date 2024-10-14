import { Request, Response } from "express";
import { User } from "../../models/user-model";
import { NotFoundError } from "../../errors";

/**
 * @swagger
 * /api/users/get:
 *   get:
 *     summary: "Get the requesting user's details"
 *     tags:
 *       - Users
 *     description: "requires authentication via JWT"
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token for authorization
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#components/schemas/Users"
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
  const user = await User.findOne({
    attributes: { exclude: ['password']},
    where: { id: req.user?.id },
  });
  
  if(!user) throw new NotFoundError()
  res.json(user.toJSON());
};
