import { CustomError, ErrorMessages } from "./custom-error";

export class NotAuthorizedError extends CustomError {
    statusCode: number = 401

    constructor() {
        super('Not Authorized')

        Object.setPrototypeOf(this, NotAuthorizedError.prototype)
    }

    serializeErrors(): ErrorMessages[] {
        return [ { message: 'Not Authorized' } ]
    }
}