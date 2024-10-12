import request from 'supertest'
import { User } from '../../../models/user-model'
import jwt from 'jsonwebtoken'
import { app } from '../../../app'


describe('GET /api/users/get', () => {
    beforeEach(async () => {
        try {
          await User.sync()
        } catch (error) {  
        }
    })

    afterEach(async () => {
        try {
          await User.drop()
        } catch (e) {  
        }
    })
    it('fails when no authorization header is present', async () => {
        const res = await request(app)
          .get('/api/users/get')
          .send()
          .expect(401)

          expect(res.body.errors[0].message).toEqual('Not Authorized')
          expect(res.body.firstName).not.toBeTruthy()
    })
    it('fails with invalid token', async () => {
        const res = await request(app)
          .get('/api/users/get')
          .auth('123', { type: 'bearer'})
          .send()
          .expect(401)

          expect(res.body.errors[0].message).toEqual('Not Authorized')
          expect(res.body.firstName).not.toBeTruthy()
    })
    it('successfully responds with the requesting user\'s information', async () => {
        const user = await createUser({
            firstName: 'Test',
            lastName: 'User',
            email: 'test@test.com',
            password: 'Test123!'
        })

        const { id } = user as unknown as { id: number}

        const token = jwt.sign({ id }, process.env.TOKEN_SECRET!)

        const res = await request(app)
          .get('/api/users/get')
          .auth(token, { type: 'bearer' })
          .send()
          .expect(200)

          expect(res.body.id).toEqual(id)
          expect(res.body.firstName).toEqual(user.firstName)
    })
})