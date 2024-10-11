import 'express-async-errors'
import express, { Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import { connectToDB, sequelize } from "./sequelize.config";
import { userRouter } from "./routes/user";
import { signinRouter } from './routes/auth/signin';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-fround-error';
config({path: "./.env"})


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(signinRouter)
app.use(userRouter)

app.all('*', () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }