/**
 * @swagger
 * /api/posts/new:
 *   post:
 *     summary: Create a new post
 *     tags:
 *       - Posts
 *     description: "Requires authentication via JWT"
 *     parameters:
 *       - $ref: "#/components/parameters/AuthHeaderParameters"
 *     requestBody:
 *       $ref: "#/components/requestBodies/PostCreateBody"
 *     responses:
 *       201:
 *         $ref: "#/responses/PostContentCreated"
 *       401:
 *         $ref: "#/responses/NotAuthorizedResponse"
 *       400:
 *         $ref: "#/responses/PostValidationBadRequest"
 *                 
 *                
 */

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: "Get a post by ID"
 *     tags:
 *       - Posts
 *     description: "Requires authentication via JWT"
 *     parameters:
 *       - $ref: "#/components/parameters/AuthHeaderParameters"
 *       - $ref: "#/components/parameters/PostIdParam"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *        $ref: "#/responses/GetPostResponse"
 *       401:
 *         $ref: "#/responses/NotAuthorizedResponse"
 *       404:
 *         $ref: "#/responses/NotFoundResponse"
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
 *       - $ref: "#/components/parameters/AuthHeaderParameters"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         $ref: "#/responses/GetAllPostsResponse"
 *       401:
 *         $ref: "#/responses/NotAuthorizedResponse"
 *       404:
 *         $ref: "#/responses/NotFoundResponse"
 *     
 */

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: "Delete the post belonging to the requesting user"
 *     tags:
 *       - Posts
 *     description: "requires authentication via JWT. Performs a soft delete for the posts"
 *     parameters:
 *       - $ref: "#/components/parameters/AuthHeaderParameters"
 *       - $ref: "#/components/parameters/PostIdParam"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       204:
 *        description: "No content"
 *       401:
 *         $ref: "#/responses/NotAuthorizedResponse"
 *       404:
 *         $ref: "#/responses/NotFoundResponse"
 *     
 */