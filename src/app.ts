import 'express-async-errors'
import express from "express";
import { config } from "dotenv";
import { userRouter } from "./routes/user";
import { signinRouter } from './routes/auth/signin';
import { postRouter } from './routes/post';
import { errorHandler } from './middleware';
import { NotFoundError } from './errors/not-fround-error';
config({path: "./.env"})


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(signinRouter)
app.use(userRouter)
app.use(postRouter)

app.all('*', () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }