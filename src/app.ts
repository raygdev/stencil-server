import 'express-async-errors'
import express from "express";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express'
import cors from 'cors'
import { config } from "dotenv";
import { userRouter } from "./routes/user";
import { signinRouter } from './routes/auth/signin';
import { postRouter } from './routes/post';
import { errorHandler } from './middleware';
import { NotFoundError } from './errors/not-fround-error';
config({path: "./.env"})

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Stencil Server API Documentation',
      version: '1.0.0',
      description: "Documentation for the Stencil API. Most routes require authentication. When using the 'signin' " +
      "route example, use the token received. Click on the authorize button in the bottom right of this " +
      "text and paste the token then click authorize. Routes that will require the Authorize header will have your token " +
      "automatically included."
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        BearerAuth: []
      }
    ]
  },
  apis: ['./src/docs/**/*.ts']
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// @ts-ignore
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(signinRouter)
app.use(userRouter)
app.use(postRouter)

app.all('*', () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }