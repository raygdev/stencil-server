import { Request, Response } from "express";
import { User } from "../../models/user-model";
import { NotFoundError } from "../../errors";
export const get = async (req: Request, res: Response) => {
  const user = await User.findOne({
    attributes: { exclude: ['password']},
    where: { id: req.user?.id },
  });
  
  if(!user) throw new NotFoundError()
  res.json(user.toJSON());
};
