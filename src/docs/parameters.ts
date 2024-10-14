/**
 * @swagger
 * components:
 *   parameters:
 *    AuthHeaderParameters:
 *      in: header
 *      name: Authorization
 *      required: true
 *      schema:
 *        type: string
 *      description: " Bearer token for authorization"
 *    PostIdParam:
 *      in: path
 *      name: "id"
 *      required: true
 *      schema:
 *         type: integer
 *      description: "ID of the post"
 *         
 */