import jwt from 'jsonwebtoken'
import { Router, Request, Response } from 'express'
import { User } from '../../models/user-model'
import bcrypt from 'bcrypt'

interface ICredentials {
    email: string
    password: string
}

const router = Router()

router.post('/api/signin', async (req: Request, res: Response) => {
    const { email, password } = req.body as ICredentials

    if(!email || !password) throw new Error('You must provide an email and password')

    const user = (await User.findOne({ where: { email }}))?.toJSON()

    if(!user) throw new Error('Cannot find that user/password combination')

    const passwordMatch = bcrypt.compareSync(password, user.password)
    if(!passwordMatch) throw new Error('Cannot find that user/password combination')

    res.json({
        ...user,
        token: jwt.sign({id: user.id }, process.env.TOKEN_SECRET!, {
            expiresIn: '2h'
        })
  })
})

export { router as signinRouter}