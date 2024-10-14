import { Request, Response } from "express";
import { User } from "../../models/user-model";
import { NotFoundError } from "../../errors";

/**
 * @swagger
 * /api/users/delete:
 *   delete:
 *     summary: "Delete the requesting user"
 *     tags:
 *       - Users
 *     description: "requires authentication via JWT. Performs a soft delete for the user"
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
 *       204:
 *        description:
 *          No content is sent
 *        content:
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

export const deleteUser = async (req: Request, res: Response) => {
    const user = await User.findOne({ where: {id: req.user!.id}})

    if(!user) throw new NotFoundError()
    
    await user.destroy()

    res.status(204).send()
}