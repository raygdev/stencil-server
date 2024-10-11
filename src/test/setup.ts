import { sequelize } from "../sequelize.config";


beforeAll(async () => {
    await sequelize.authenticate()
})

afterAll(async () => {
    await sequelize.close()
})


