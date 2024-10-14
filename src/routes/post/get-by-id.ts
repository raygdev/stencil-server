import { NotAuthorizedError, NotFoundError } from "../../errors";
import { Post } from "../../models/posts-model";
import { Request, Response } from "express";

export const getById = async (req: Request, res: Response) => {
    const { id } = req.params

    const post = (await Post.findOne({ where: { id }}))?.toJSON()

    if(!post) throw new NotFoundError()

    if(post.userId !== req.user!.id) throw new NotAuthorizedError()

    res.status(200).json(post)
}