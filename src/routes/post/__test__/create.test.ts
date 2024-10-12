import request from 'supertest'
import { app } from '../../../app';
import { User } from "../../../models/user-model";
import { Post } from "../../../models/posts-model";



describe('POST /api/posts/new', () => {
    it.todo('should fail with no authentication header')
    it.todo('should fail on invalid token')
    it.todo('should fail with an empty note')
    it.todo('should fail if not a string')
    it.todo('should successfully create a post')
    it.todo('should should successfully sanitize html entities')
    it.todo('')
})