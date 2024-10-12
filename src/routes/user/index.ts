import { Router } from "express";
import { get } from './get'
import { create } from "./create";
import { deleteUser } from "./delete";
import { requireAuth, email, firstName, lastName, isValidRequest, password } from "../../middleware";
const router = Router()

router.get('/api/users/get',
    requireAuth,
    get
)
router.post('/api/users/create',
    [
      email,
      firstName,
      lastName,
      password
    ],
    isValidRequest,
    create
)

router.delete('/api/users/delete',
  requireAuth,
  deleteUser
)

export { router as userRouter }

