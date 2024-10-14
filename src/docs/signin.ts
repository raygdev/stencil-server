/**
 * @swagger
 * /api/signin:
 *   post:
 *     summary: "Authenticate the user"
 *     description: "Uses an email and password in the request body to authenticate the user"
 *     tags:
 *       - Signin
 *     requestBody:
 *       description: "Required fields to authenticate the user"
 *       $ref: "#/components/requestBodies/SigninRequestBody"
 *     responses:
 *       200:
 *        $ref: "#/responses/AuthenticatedUserResponse"
 *       404:
 *        $ref: "#/responses/NotFoundResponse"    
 *     
 */