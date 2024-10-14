/**
 * @swagger
 * /api/users/create:
 *   post:
 *     summary: Create a user
 *     tags:
 *       - Users
 *     description: Creates a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First name of the user
 *               lastName:
 *                 type: string
 *                 description: Last name of the user
 *               email:
 *                 type: string
 *                 description: The user's valid email address
 *               password:
 *                 type: string
 *                 description: The password for the user's account
 *     responses:
 *       201:
 *         description: Successful response with the new user's details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       400:
 *         description: A failed validation or unknown error response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: "Validation errors related to malformed or missing fields"
 *               properties:
 *                 errors:
 *                   $ref: "#/components/schemas/ValidationErrors"
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
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token for authorization
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#components/schemas/Users"
 *       401:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   $ref: "#components/schemas/NotAuthorizedError"
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                errors:
 *                  $ref: "#components/schemas/NotFoundError"
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
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token for authorization
 *     security:
 *       -BearerAuth: []
 *     responses:
 *       204:
 *        description:
 *          No content is sent
 *        content:
 * 
 *       401:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   $ref: "#components/schemas/NotAuthorizedError"
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                errors:
 *                  $ref: "#components/schemas/NotFoundError"
 *     
 */