import 'express-async-errors'
import express, { Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import { connectToDB, sequelize } from "./sequelize.config";
import { userRouter } from "./routes/user";
import { signinRouter } from './routes/auth/signin';
config({path: "./.env"})


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(signinRouter)
app.use(userRouter)

app.use((err: Error, req: Request,res: Response, next: NextFunction ) => {
  console.log(err)
  // console.log(sequelize.getDatabaseName())
  res.status(400).send({
    message: "An error occurred",
    error: err?.message || err
  })
})

export { app }