import request from 'supertest'
import { app } from '../../../app';
import { Post } from "../../../models/posts-model";
import { User } from '../../../models/user-model';


describe('DELETE /api/posts/:id', () => {
    it.todo('fails when param is not a number')
    it.todo('fails when authentication header is absent')
    it.todo('fails with invalid token')
    it.todo('fails if requesting user doesn\'t own the post')
    it.todo('successfully deletes the post and is soft deleted')
})