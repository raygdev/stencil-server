import request from 'supertest'
import { app } from '../../../app'
import { User } from '../../../models/user-model'
import jwt from 'jsonwebtoken'

describe('POST /api/signin', () => {

    const userCredentials = {
        password: 'Test123!',
        email: 'test@test.com'
    }

    beforeEach(async () => {
        try {
            await User.sync()
            // global to generate a test user
            // tests are asserted with this user
            await createUser()
        } catch (error) {
        }
    })

    afterEach(async () => {
        await User.drop()
    })

    it('fails validation when no password is sent', async () => {
      const res = await request(app)
        .post('/api/signin')
        .send({
            ...userCredentials,
            password: ''
        })
        .expect(400)

        expect(res.body.errors[0].message).toEqual('password must be provided')
    })
    it('fails validation when no email is sent', async () => {
        const res = await request(app)
        .post('/api/signin')
        .send({
            ...userCredentials,
            email: ''
        })
        .expect(400)

        expect(res.body.errors[0].message).toEqual('email must be provided')
    })
    it('fails on validation when invalid email is sent', async () => {
        const res = await request(app)
        .post('/api/signin')
        .send({
            ...userCredentials,
            email: 'test.com'
        })
        .expect(400)

        expect(res.body.errors[0].message).toEqual('email must be valid') 
    })
    it('fails on validation when invalid password is sent', async () => {
        const res = await request(app)
        .post('/api/signin')
        .send({
            ...userCredentials,
            password: 'te12'
        })
        .expect(400)

        expect(res.body.errors[0].message).toEqual('password must be a minimum of 8 characters')
    })
    it('fails when the user isn\'t found', async () => {
        const res = await request(app)
        .post('/api/signin')
        .send({
            ...userCredentials,
            email: 'test@123.com'
        })
        .expect(404)

        expect(res.body.errors[0].message).toEqual('Not Found')
    })
    it('fails when passwords do not match', async () => {
        const res = await request(app)
        .post('/api/signin')
        .send({
            ...userCredentials,
            password: 'Test1234!'
        })
        .expect(404)

        expect(res.body.errors[0].message).toEqual('Not Found')
    })
    it('successfully responds with the user information and token', async () => {
        const res = await request(app)
          .post('/api/signin')
          .send(userCredentials)
          .expect(200)

          const decoded = jwt.verify(res.body.token, process.env.TOKEN_SECRET!) as { id: string }

          expect(decoded.id).toEqual(res.body.id)
          expect(res.body.password).not.toBeTruthy()
          expect(res.body.firstName).toEqual('Test')
          expect(res.body.token).toBeTruthy()
    })
})