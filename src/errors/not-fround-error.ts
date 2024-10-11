import { CustomError, ErrorMessages } from "./custom-error";

export class NotFoundError extends CustomError {
    statusCode: number = 404
    constructor() {
        super('Not Found')
    }

    serializeErrors(): ErrorMessages[] {
        return [ { message: 'Not Found' } ]
    }
}