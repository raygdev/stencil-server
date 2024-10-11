import { Sequelize } from "sequelize";
import { Express } from "express";
import { config } from "dotenv";
config({ path: './.env'})

enum DB_NAME {
    develop='posts',
    test='test-posts'
}

// const DB_NAME = process.env.NODE_ENV === 'test' ? 'test-posts' : 'posts'

export const sequelize = new Sequelize({
    host: 'localhost',
    port: 5432,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    dialect: 'postgres',
    database: process.env.NODE_ENV === 'test' ? DB_NAME.test : DB_NAME.develop,
    logging: false
})

export const connectToDB = async (app: Express) => {
    try {
        await sequelize.authenticate()
        console.log('successfully connected to db')
    } catch (e) {
        console.log('failed to connect to db')
        console.log("[ERROR]", e)
    }

    app.listen(8080, () => {
        console.log("App listening on 8080")
    })
}