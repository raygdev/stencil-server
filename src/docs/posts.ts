/**
 * @swagger
 * /api/posts/new:
 *   post:
 *     summary: Create a user
 *     tags:
 *       - Posts
 *     description: Creates a new user
 *     parameters:
 *       - in: headers
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token for authorization
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - note
 *             properties:
 *               note:
 *                 type: string
 *                 description: "The post body to be saved"
 *                 example: "Some post body"
 *     responses:
 *       201:
 *         description: Successful response with the new user's details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       401:
 *         description: Not authorized error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: "Not Authorized error"
 *               properties:
 *                 errors:
 *                   $ref: "#/components/schemas/NotAuthorizedError"
 *       400:
 *         description: A failed validation or unknown error response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: "Validation errors related to malformed or missing fields"
 *               properties:
 *                 errors:
 *                   $ref: "#/components/schemas/PostValidationError"
 *                 
 *                
 */

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: "Get a post belonging to a user by ID"
 *     tags:
 *       - Posts
 *     description: "requires authentication via JWT."
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token for authorization
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the post to delete
 *     security:
 *       -BearerAuth: []
 *     responses:
 *       200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#components/schemas/Post"
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

/**
 * @swagger
 * /api/posts/get:
 *   get:
 *     summary: "Get all of the requesting user's posts"
 *     tags:
 *       - Posts
 *     description: "requires authentication via JWT"
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
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Post"
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
 * /api/posts/new:
 *   delete:
 *     summary: "Delete the post belonging to the requesting user"
 *     tags:
 *       - Posts
 *     description: "requires authentication via JWT. Performs a soft delete for the posts"
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token for authorization
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the post to delete
 *     security:
 *       -BearerAuth: []
 *     responses:
 *       204:
 *        description:
 *          No content is sent on success
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