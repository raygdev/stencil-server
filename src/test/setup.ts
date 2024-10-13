import bcrypt from 'bcrypt'
import { User } from "../models/user-model";
import { ICreateUserRequest } from "../routes/user/create";
import { sequelize } from "../sequelize.config";
import jwt from 'jsonwebtoken'
import { Post } from '../models/posts-model';

export interface IUser extends ICreateUserRequest {
    id: number,
    token: string
}

interface ICreatePost {
    note: string,
    userId: number
}

export interface IPost extends ICreatePost {
    id: number,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: null | Date
}

declare global {
    var createUser: () => Promise<IUser>
    var generateToken: (id: number) => string
    var createPost:  (id: number) => Promise<IPost>
}

global.createPost = async (id) => {
    const newPost = await Post.create({
        note: 'Some new note',
        userId: id
    })
    await newPost.save()

    return newPost.toJSON() as IPost
}

global.generateToken = (id) => {
    return jwt.sign({ id}, process.env.TOKEN_SECRET!)
}

global.createUser = async () => {
    await User.sync({ force: true })
    const newUser = await User.create({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@test.com',
        password: bcrypt.hashSync('Test123!', 10)
    })
    await newUser.save()
    return {
        ...newUser.toJSON(),
        token: generateToken(newUser.toJSON().id)
    }
}



beforeAll(async () => {
    process.env.TOKEN_SECRET = "123"
    try {
        await sequelize.sync()
    } catch(e) {
    }
})


afterAll(async () => {

    try{
      await sequelize.drop()
      await sequelize.close()
    } catch(e) {
        console.log(e)
    }
})


