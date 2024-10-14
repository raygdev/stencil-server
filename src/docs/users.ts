/**
 * @swagger
 * /api/users/create:
 *   post:
 *     summary: Create a user
 *     tags:
 *       - Users
 *     description: Creates a new user
 *     requestBody:
 *       $ref: "#/components/requestBodies/UserCreateRequestBody"
 *     responses:
 *       201:
 *         $ref: "#/responses/UserContentCreated"
 *       400:
 *         $ref: "#/responses/UserValidationBadRequest"
 *                 
 *                
 */

/**
 * @swagger
 * /api/users/get:
 *   get:
 *     summary: "Get the requesting user's details"
 *     tags:
 *       - Users
 *     description: "requires authentication via JWT"
 *     parameters:
 *       - $ref: "#/components/parameters/AuthHeaderParameters"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#components/schemas/Users"
 *       401:
 *         $ref: "#/responses/NotAuthorizedResponse"
 *       404:
 *         $ref: "#/responses/NotFoundResponse"
 *     
 */

/**
 * @swagger
 * /api/users/delete:
 *   delete:
 *     summary: "Delete the requesting user"
 *     tags:
 *       - Users
 *     description: "requires authentication via JWT. Performs a soft delete for the user"
 *     parameters:
 *       - $ref: "#/components/parameters/AuthHeaderParameters"
 *     security:
 *       -BearerAuth: []
 *     responses:
 *       204:
 *        description: "No Content"
 *       401:
 *         $ref: "#/responses/NotAuthorizedResponse"
 *       404:
 *         $ref: "#/responses/NotFoundResponse"
 *     
 */