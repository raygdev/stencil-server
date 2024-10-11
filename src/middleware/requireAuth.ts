import jwt from 'jsonwebtoken'
import { Request, Response, RequestHandler, NextFunction } from 'express'
import { User } from '../models/user-model'

export const requireAuth: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.get('authorization')?.split(" ")[1]

  if(!token) throw new Error("Not Authorized")

  const { id } = jwt.verify(token, process.env.TOKEN_SECRET!) as { id: string }

  const user = await User.findOne({ where: { id }})
  req.user = user?.toJSON()
  next()
}