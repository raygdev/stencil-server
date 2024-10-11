import { CustomError, ErrorMessages } from "./custom-error";

export class NotAuthorizedError extends CustomError {
    statusCode: number = 401

    constructor() {
        super('Not Authorized')
    }

    serializeErrors(): ErrorMessages[] {
        return [ { message: 'Not Authorized' } ]
    }
}