import jwt from 'jsonwebtoken'
import { Request, Response, RequestHandler, NextFunction } from 'express'
import { User } from '../models/user-model'
import { NotAuthorizedError, NotFoundError } from '../errors'

export const requireAuth: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.get('authorization')?.split(" ")[1]

  if(!token) throw new NotAuthorizedError()

   try {
     const { id } = jwt.verify(token, process.env.TOKEN_SECRET!) as { id: string }
   
     const user = await User.findOne({ where: { id }})

     if(!user) throw new NotFoundError()
     req.user = user.toJSON()

   } catch(e) {
    console.log("[AuthError]", e)
    throw new NotAuthorizedError()
   }

  next()
}