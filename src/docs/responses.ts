/** 
 * @swagger
 * responses:
 *   AuthenticatedUserResponse:
 *     content:
 *       application/json:
 *         schema:
 *           allOf:
 *             - $ref: "#/components/schemas/Users"
 *             - type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "<TOKEN>"
 *   NotAuthorizedResponse:
 *     description: "Not Authorized"
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             errors:
 *               $ref: "#/components/schemas/NotAuthorizedError"
 *   NotFoundResponse:
 *     description: "Not Found"
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             errors:
 *               $ref: "#/components/schemas/NotFoundError"
 * 
 *   PostContentCreated:
 *     description: "Created"
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/Post"
 *   UserContentCreated: 
 *     description: "Created"
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/Users"
 *   UserValidationBadRequest:
 *     description: "Bad Request"
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             errors:
 *               $ref: "#/components/schemas/ValidationErrors"
 *   PostValidationBadRequest:
 *     description: "Bad Request"
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             errors:
 *               $ref: "#/components/schemas/PostValidationError"
 *   GetPostResponse:
 *     description: "Ok"
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/Post"
 *   GetAllPostsResponse:
 *     description: "Ok"
 *     content:
 *       application/json:
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Post"
 */