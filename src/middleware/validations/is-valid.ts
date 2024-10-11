import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../../errors/request-validation-errors";

export const isValidRequest = async (req: Request, res: Response, next: NextFunction) => {
   const result = validationResult(req)
   if(!result.isEmpty()) {
    throw new RequestValidationError(result.array())
   }
   next()
}