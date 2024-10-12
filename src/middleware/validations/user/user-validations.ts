import { body } from "express-validator";

export const email = body('email')
  .notEmpty()
  .withMessage('email must be provided')
  .isEmail()
  .withMessage('email must be valid')
  .trim()
  .isString()
  .withMessage('email must be a string')
  .trim()

export const password = body('password')
  .notEmpty()
  .withMessage('password must be provided')
  .isLength({ min: 8 })
  .withMessage('password must be a minimum of 8 characters')
  .isStrongPassword({
    minSymbols: 1,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1
  })
  .withMessage(
    `password must contain at least one uppercase letter, one lowercase letter, one special
     character, and one number
    `
  )
  .trim()


export const firstName = body('firstName')
  .notEmpty()
  .withMessage('first name must be provided')
  .isLength({ min: 2, max: 32 })
  .withMessage('name must be between 2 and 32 characters')
  .isString()
  .withMessage('name must be a string')
  .trim()

export const lastName = body('lastName')
  .notEmpty()
  .withMessage('last name must be provided')
  .isLength({ min: 2, max: 32 })
  .withMessage('last name must be between 2 and 32 characters')
  .isString()
  .withMessage('last name must be a string')
  .trim()

  