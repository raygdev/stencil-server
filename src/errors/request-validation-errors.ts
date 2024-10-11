import { CustomError, ErrorMessages } from "./custom-error";
import { ValidationError } from "express-validator";

export class RequestValidationError extends CustomError {
    statusCode: number = 400
    constructor(public errors: ValidationError[]) {
        super('Invalid pequest parameters')

    }

    serializeErrors(): ErrorMessages[] {
      const formattedErrors = this.errors.map(error => {
        return {
            message: error.msg,
            field: error.type === 'field' && error.path || ""
        }
      })

      return formattedErrors
    }
}