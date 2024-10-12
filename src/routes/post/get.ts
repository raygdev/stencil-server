import { Request, Response } from "express";
import { Post } from "../../models/posts-model";
import { NotFoundError } from "../../errors";

export const get = async (req: Request, res: Response) => {
  const posts = await Post.findAll({ where:{ userId: req.user!.id} })
  console.log("[POSTS]",posts)

  if(!posts) throw new NotFoundError()

  res.status(200).json(posts)
}