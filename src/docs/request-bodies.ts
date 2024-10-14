/**
 * @swagger
 * components:
 *   requestBodies:
 *     SigninRequestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/SigninBody"
 *     PostCreateBody:
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
 *                 description: "The post body to be created"
 *                 example: "Some post body"
 * 
 *     UserCreateRequestBody:
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
 *                 example: "Test"
 *               lastName:
 *                 type: string
 *                 description: Last name of the user
 *                 example: "User"
 *               email:
 *                 type: string
 *                 description: The user's valid email address
 *                 example: "test@test.com"
 *               password:
 *                 type: string
 *                 description: The password for the user's account
 *                 example: "Test123!"
 */