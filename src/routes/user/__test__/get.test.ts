import request from 'supertest'
import { User } from '../../../models/user-model'
import { app } from '../../../app'


describe('GET /api/users/get', () => {
    it.todo('fails when no authorization header is present')
    it.todo('fails with invalid token')
    it.todo('successfully responds with the requesting user\'s information')
})