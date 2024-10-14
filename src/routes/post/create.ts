import { Post } from "../../models/posts-model";
import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
    const post = await Post.create({
        note: req.body.note,
        userId: req.user!.id
    })

    await post.save()

    res.status(200).json(post.toJSON())

}