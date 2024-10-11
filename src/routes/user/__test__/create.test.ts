import { app } from "../../../app";
import request from 'supertest'
import { User } from "../../../models/user-model";


describe('POST /api/users/create', () => {

   beforeEach((done) => {
    User.sync({ force: true })
     .then(() => done())
     .catch(e => {
      console.log(e)
      done()
     })
   })

   const userInfo = {
    firstName: 'Some',
    lastName: 'Guy',
    email: 'some.guy@gmail.com',
    password: 'Test123!'
   }

   it('fails on invalid email address', async () => {
    const res = await request(app)
      .post('/api/users/create')
      .send({
        ...userInfo,
        email: ''
      })
      .expect(400)

      expect(res.body.errors).toBeTruthy()
      expect(Array.isArray(res.body.errors)).toBe(true)
      expect(res.body.errors[0].field).toEqual('email')
   })

   it('fails on invalid first name', async () => {
    const res = await request(app)
      .post('/api/users/create')
      .send({
        ...userInfo,
        firstName: ''
      })
      .expect(400)

      expect(res.body.errors).toBeTruthy()
      expect(res.body.errors[0].field).toEqual('firstName')
   })

   it('fails on invalid last name', async () => {
    const res = await request(app)
      .post('/api/users/create')
      .send({
        ...userInfo,
        lastName: ''
      })
      .expect(400)

      expect(res.body.errors).toBeTruthy()
      expect(res.body.errors[0].field).toEqual('lastName')
   })

   it('fails on invalid password', async () => {
    const res = await request(app)
      .post('/api/users/create')
      .send({
        ...userInfo,
        password: ''
      })
      .expect(400)

      expect(res.body.errors).toBeTruthy()
      expect(res.body.errors[0].field).toEqual('password')
   })

   it('creates a new user with valid properties', async () => {
    const req = await request(app)
      .post('/api/users/create')
      .send(userInfo)
      .expect(201)
      // console.log(req.body.errors)

    expect(req.body.firstName).toEqual(userInfo.firstName)
    expect(req.body.lastName).toEqual(userInfo.lastName)

   })

})