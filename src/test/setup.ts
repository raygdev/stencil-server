import { sequelize } from "../sequelize.config";
import { User } from "../models/user-model";

beforeAll(async () => {
    await sequelize.authenticate()
})

// beforeEach( async () => {
//     await User.sync({ force: true })
// })

afterAll(async () => {
    await sequelize.close()
})

// beforeAll(async () => {
//     // await sequelize.sync({ force: true })
//     await sequelize.authenticate()
//     const db = sequelize.getDatabaseName()
//     // await User.sync({ force: true })
//     if(db !== 'test-posts') {
//         console.log('db name is production name exiting process')
//         await sequelize.close()
//         process.exit()
//     }
// })

// afterAll(async () => {
//     await sequelize.close()
// })

