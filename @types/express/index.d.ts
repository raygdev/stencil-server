import { Express, Request } from "express"

interface IRequestingUser {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
}

declare global {
    namespace Express {
        interface Request {
            user?: IRequestingUser
        }
    }
}