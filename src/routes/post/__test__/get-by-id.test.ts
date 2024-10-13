import request from 'supertest'
import { app } from '../../../app';
import { User } from '../../../models/user-model';

describe('GET /api/posts/:id', () => {
    it('fails when id is not a number', async () => {
        const param = 'kl'
        const res = await request(app)
          .get(`/api/posts/${param}`)
          .send()
          .expect(400)

          expect(res.body.errors[0].message).toEqual('id must be a number as a parameter')
    })

    it('fails when no authentication header is present', async () => {
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

    it('fails when requesting user doesn\'t own the post', async () => {
        const { id } = await createUser()
        const otherUser = await User.create({
          firstName: 'Some',
          lastName: 'Guy',
          email: 'someguy@gmail.com',
          password: "Test123!"
        })
        await otherUser.save()

        const token = generateToken(otherUser.toJSON().id)

        const post = await createPost(id)

        const res = await request(app)
          .get(`/api/posts/${post.id}`)
          .auth(token, { type: 'bearer' })
          .send()
          .expect(401)

          expect(res.body.errors[0].message).toEqual('Not Authorized')
    })

    it('successfully responds with a single post', async () => {
        const { id, token } = await createUser()
        const post = await createPost(id)
        const res = await request(app)
          .get(`/api/posts/${post.id}`)
          .auth(token, { type: 'bearer'})
          .send()
          .expect(200)

        expect(res.body.id).toEqual(post.id)
        expect(res.body.userId).toEqual(id)
    })
})