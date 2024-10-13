import request from 'supertest'
import { app } from '../../../app';
describe('POST /api/posts/new', () => {

    it('should fail with no authentication header', async () => {
        const res = await request(app)
          .post('/api/posts/new')
          .send({ note: 'something' })
          .expect(401)

          expect(res.body.errors[0].message).toEqual('Not Authorized');
    })

    it('should fail on invalid token', async () => {
        const res = await request(app)
          .post('/api/posts/new')
          .auth('123', { type: 'bearer' })
          .send({ note: 'something' })
          .expect(401)

          expect(res.body.errors[0].message).toEqual('Not Authorized');
    })

    it('should fail with an empty note', async () => {
        const res = await request(app)
          .post('/api/posts/new')
          .send({ note: '' })
          .expect(400)

          expect(res.body.errors[0].message).toEqual('note must be provided');
    })

    it('should fail if not a string', async () => {
        const res = await request(app)
          .post('/api/posts/new')
          .send({ note: { other: 'something' } })
          .expect(400)

          expect(res.body.errors[0].message).toEqual('Notes must be a string');
    })

    it('should successfully create a post', async () => {
        const { token, id } = await createUser()
        const res = await request(app)
          .post('/api/posts/new')
          .auth(token, { type: 'bearer' })
          .send({ note: 'something' })
          .expect(200)

          expect(res.body.note).toEqual("something");
          expect(res.body.userId).toEqual(id)
    })

    it('should successfully sanitize html entities', async () => {
        const { token, id } = await createUser()
        const res = await request(app)
          .post('/api/posts/new')
          .auth(token, { type: 'bearer' })
          .send({ note: '<>&' })
          .expect(200)

          expect(res.body.note).toEqual("&lt;&gt;&amp;");
          expect(res.body.userId).toEqual(id) 
    })

    it('should successfully trim whitespace', async () => {
        const { token, id } = await createUser()
        const res = await request(app)
          .post('/api/posts/new')
          .auth(token, { type: 'bearer' })
          .send({ note: '    something     ' })
          .expect(200)

          expect(res.body.note).toEqual("something");
          expect(res.body.userId).toEqual(id)
    })
})