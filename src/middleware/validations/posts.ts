import { body, param } from "express-validator";

export const validateNotes = body('note')
  .notEmpty()
  .withMessage('note must be provided')
  .isString()
  .withMessage('Notes must be a string')
  .trim()
  .escape()

export const validateId = param('id')
  .isInt()
  .withMessage('id must be a number as a parameter')