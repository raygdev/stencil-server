import { Router } from "express";
import { get } from './get'
import { create } from "./create";
import { requireAuth } from "../../middleware/requireAuth";

const router = Router()

router.get('/api/users/get',
    requireAuth,
    get
)
router.post('/api/users/create',
    create
)

export { router as userRouter }

