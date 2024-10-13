import request from 'supertest'
import { app } from '../../../app'


describe('GET /api/users/get', () => {

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
        const user = await createUser()

        const { id, token, firstName } = user

        const res = await request(app)
          .get('/api/users/get')
          .auth(token, { type: 'bearer' })
          .send()
          .expect(200)

          expect(res.body.id).toEqual(id)
          expect(res.body.firstName).toEqual(firstName)
    })
})