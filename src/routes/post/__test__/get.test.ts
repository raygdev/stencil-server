import request from 'supertest'
import { app } from '../../../app'
import { Post } from '../../../models/posts-model'
import { IPost } from '../../../test/setup'

describe('GET /api/posts/get', () => {
    it('fails when no authentication header present', async () => {
        const res = await request(app)
          .get('/api/posts/1')
          .send()
          .expect(401)

          expect(res.body.errors[0].message).toEqual('Not Authorized')
    })
    it('fails when invalid token is sent', async () => {
        const res = await request(app)
          .get('/api/posts/1')
          .auth('123', { type: 'bearer' })
          .send()
          .expect(401)

          expect(res.body.errors[0].message).toEqual('Not Authorized')
    })
    it('successfully responds with an array of posts created by the requesting user', async () => {
        const { id, token } = await createUser()
        const post1 = await createPost(id)
        const post2 = await createPost(id)
        const post3 = await createPost(id)

        const res = await request(app)
          .get('/api/posts/get')
          .auth(token, { type: 'bearer' })
          .send()
          .expect(200)

          expect(Array.isArray(res.body)).toBe(true)
          res.body.forEach((post: IPost) => {
            expect(post.userId).toEqual(id)
            expect(post.note).toEqual('Some new note')
          });
    })
})