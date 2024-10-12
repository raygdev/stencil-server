import request from 'supertest'
import { app } from '../../../app'
import { Post } from '../../../models/posts-model'

describe('GET /api/posts/get', () => {
    it.todo('fails when no authentication header present')
    it.todo('fails when invalid token is sent')
    it.todo('successfully responds with an array of posts created by user')
})