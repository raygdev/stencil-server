import { Router } from "express";
import { requireAuth } from "../../middleware";
import { create } from "./create";
import { get } from "./get";
import { getById } from "./get-by-id";
import { deletePost } from "./delete";
import { validateId, validateNotes } from "../../middleware";
import { isValidRequest } from "../../middleware";


const router = Router()

router.post("/api/posts/new",
  validateNotes,
  isValidRequest,
  requireAuth,
  create
)

router.get('/api/posts/get',
    requireAuth,
    get
)

router.get('/api/posts/:id', 
    validateId,
    isValidRequest,
    requireAuth,
    getById
)

router.delete('/api/posts/:id', 
    validateId,
    isValidRequest,
    requireAuth,
    deletePost
)

export { router as postRouter}