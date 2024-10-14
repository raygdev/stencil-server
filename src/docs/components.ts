/**
 * @swagger
 * components:
 *   securitySchemas:
 *     BearerAuth:
 *       type: http
 *       schema: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     SigninBody:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email: 
 *           type: string
 *           description: "The user's email"
 *           example: "test@test.com"
 *         password:
 *           type: string
 *           description: "The user's password"
 *           example: "Test123!"
 *       
 *     Users:
 *       type: object
 *       description: "returned user object on successful creation"
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         firstName:
 *           type: string
 *           example: "John"
 *         lastName:
 *           type: string
 *           example: "Smith"
 *         email:
 *           type: string
 *           example: john.smith@yahoo.com
 *         createdAt:
 *           type: Date
 *           example: "2024-10-12T17:57:39.217Z"
 *         updatedAt:
 *           type: Date
 *           example: "2024-10-12T17:57:39.217Z"
 *         deletedAt:
 *           type: Date || null
 *           example: null
 *     ValidationErrors:
 *       type: object
 *       description: "an array of failed validations for missing or malformed fields"
 *       properties:
 *         message:
 *          type: string
 *          description: "reason why the field failed validation"
 *         field:
 *           type: string
 *           description: "the field that failed validation"
 *       example:
 *         - message: "email must be provided"
 *           field: "email"
 *         - message: "first name must be provided"
 *           field: "firstName"
 *         - message: "last name must be provided"
 *           field: "lastName"
 *         - message: "password must be provided"
 *           field: "password"
 *     NotAuthorizedError:
 *       type: object
 *       description: "an array with an authorization error when not authenticated"
 *       properties:
 *         message:
 *           type: string
 *           description: "not authorized error"
 *       example:
 *         - message: "Not Authorized"
 *     NotFoundError:
 *       type: object
 *       description: "an array with an error if a resource is not found"
 *       properties:
 *         message:
 *           type: string
 *           description: "not found error"
 *       example:
 *         - message: "Not Found"
 *     Post:
 *       type: object
 *       description: "A post object belonging to the requesting user"
 *       properties:
 *         id:
 *           type: integer
 *           description: "The ID of the post"
 *           example: 1
 *         note:
 *           type: string
 *           description: "The body of the post"
 *           example: "Some random text"
 *         userId: 
 *           type: integer
 *           description: "The ID of the user that owns the post"
 *           example: 2
 *         updatedAt:
 *           type: Date
 *           description: "The time the post was updated"
 *           example: "2024-10-12T17:57:39.217Z"
 *         createdAt:
 *           type: Date
 *           description: "The time the post was created"
 *           example: "2024-10-12T17:57:39.217Z"
 *         deletedAt:
 *           type: null
 *           example: null
 *       example:
 *         id: 1
 *         note: "Some new note"
 *         userId: 1
 *         createdAt: "2024-10-12T17:57:39.217Z"
 *         updatedAt: "2024-10-12T17:57:39.217Z"
 *         deletedAt: null
 *     PostValidationError:
 *       type: object
 *       description: "an array of failed validations for missing or malformed fields"
 *       properties:
 *         message:
 *           type: string
 *           description: "a reason why the field failed validation"
 *         field:
 *           type: string
 *           description: "the field that failed validation"
 *       example:
 *         - message: "a note must be provided"
 *           field: "note"   
 *   
 */