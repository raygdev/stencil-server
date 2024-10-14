import { Request, Response } from "express";
import { User } from "../../models/user-model";
import { NotFoundError } from "../../errors";

export const deleteUser = async (req: Request, res: Response) => {
    const user = await User.findOne({ where: {id: req.user!.id}})

    if(!user) throw new NotFoundError()
    
    await user.destroy()

    res.status(204).send()
}