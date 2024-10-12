import bcrypt from 'bcrypt'
import { User } from "../models/user-model";
import { ICreateUserRequest } from "../routes/user/create";
import { sequelize } from "../sequelize.config";

interface IUser extends ICreateUserRequest {
    id: number
}
declare global {
    var createUser: (user: ICreateUserRequest) => Promise<IUser>
}

global.createUser = async (user) => {
    const newUser = await User.create({
        ...user,
        password: bcrypt.hashSync(user.password, 10)
    })
    await newUser.save()
    return newUser.toJSON()
}


beforeAll(async () => {
    try {
        await sequelize.sync()
    } catch(e) {
    }
})


afterAll(async () => {

    try{
      await sequelize.close()
    } catch(e) {
        console.log(e)
    }
})


