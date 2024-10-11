import request from 'supertest'
import { app } from '../../../app'
import { User } from '../../../models/user-model'

describe('POST /api/signin', () => {
    it.todo('fails validation when no password is sent')
    it.todo('fails validation when no email is sent')
    it.todo('fails on validation with invalid email is sent')
    it.todo('fails on validation when invalid password is passed')
    it.todo('fails when user isn\'t found')
    it.todo('fails when passwords do not match')
    it.todo('successfully responds with user information and token')
})