import { Request, Response } from "express";
import { User } from "../../models/user-model";
export const get = async (req: Request, res: Response) => {
  const user = await User.findOne({
    attributes: { exclude: ['password']},
    where: { id: req.user?.id },
});

  res.json(user?.toJSON());
};
