import request from 'supertest'
import { app } from '../../../app';
import { Post } from "../../../models/posts-model";


describe('DELETE /api/posts/:id', () => {

    it('fails when param is not a number', async () => {
      const param = 'kl'
      const res = await request(app)
        .delete(`/api/posts/${param}`)
        .send()
        .expect(400)

        expect(res.body.errors[0].message).toEqual('id must be a number as a parameter')
    })

    it('fails when authorization header is absent', async () => {
        const res = await request(app)
          .delete('/api/posts/1')
          .send()
          .expect(401)
    })

    it('fails with invalid token', async () => {
        const res = await request(app)
          .delete('/api/posts/1')
          .auth('123', { type: 'bearer' })
          .send()
          .expect(401)
    })

    it('fails if requesting user doesn\'t own the post', async () => {
        const { id } = await createUser()
        const otherUser = generateToken(54)

        const newPost = await Post.create({ note: 'not other user\'s note', userId: id })
        await newPost.save()
        const post = newPost.toJSON()

        const res1 = await request(app)
          .delete(`/api/posts/${post.id}`)
          .auth(otherUser, { type: 'bearer'})
          .send()
          .expect(401)
    })

    it('successfully deletes the post and is soft deleted', async () => {
        const { id, token } = await createUser()
        const newPost = await Post.create({ note: 'not other user\'s note', userId: id }) 
        const post = newPost.toJSON()

        const res = await request(app)
          .delete(`/api/posts/${post.id}`)
          .auth(token, { type: "bearer"})
          .send()
          .expect(204)
        
        expect(post.userId).toEqual(id)

        const deletedPost = (await Post.findOne({
            where: { id: post.id },
            paranoid: false
        }))?.toJSON()

        expect(deletedPost.id).toEqual(post.id)
        expect(deletedPost.deletedAt).toBeTruthy()
    })
})