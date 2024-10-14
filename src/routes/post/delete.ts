import { NotAuthorizedError, NotFoundError } from "../../errors";
import { Post } from "../../models/posts-model";
import { Request, Response } from "express";

export const deletePost = async (req: Request, res: Response) => {
    const { id } = req.params

    const post = await Post.findOne({ where: { id } })

    if(!post) throw new NotFoundError()

    if(post.toJSON().userId !== req.user!.id) throw new NotAuthorizedError()

    await post.destroy()

    res.status(204).send()
}