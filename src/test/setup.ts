import bcrypt from 'bcrypt'
import { User } from "../models/user-model";
import { ICreateUserRequest } from "../routes/user/create";
import { sequelize } from "../sequelize.config";
import jwt from 'jsonwebtoken'

export interface IUser extends ICreateUserRequest {
    id: number,
    token: string
}
declare global {
    var createUser: () => Promise<IUser>
    var generateToken: (id: number) => string
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


