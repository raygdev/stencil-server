import request from 'supertest'
import { Post } from "../../../models/posts-model";
import { app } from '../../../app';

describe('GET /api/posts/:id', () => {
    it.todo('fails when id is not a number')
    it.todo('fails when no authentication header is present')
    it.todo('fails when invalid token is sent')
    it.todo('fails when requesting user doesn\'t own the post')
    it.todo('successfully responds with a single post')
})