import { app } from "../../../app";
import request from 'supertest'
import { User } from "../../../models/user-model";


describe('POST /api/users/create', () => {

    beforeEach(async () => {
        await User.sync({ force: true })
    })

   const userInfo = {
    firstName: 'Some',
    lastName: 'Guy',
    email: 'some.guy@gmail.com',
    password: 'test123'
   }

   it('creates a new user', async () => {
    const req = await request(app)
      .post('/api/users/create')
      .send(userInfo)
      .expect(200)

    expect(req.body.firstName).toEqual(userInfo.firstName)
    expect(req.body.lastName).toEqual(userInfo.lastName)

   })
})