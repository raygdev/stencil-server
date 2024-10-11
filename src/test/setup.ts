import { User } from "../models/user-model";
import { sequelize } from "../sequelize.config";


beforeAll(async () => {
    await sequelize.sync({ force: true })
})


afterAll(async () => {
    await sequelize.close()
})


