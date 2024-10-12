import request from 'supertest'
import { app } from '../../../app'
import { User } from '../../../models/user-model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

describe('POST /api/users/delete', () => {

    beforeEach(async () => {
        try {
          await User.sync()
        } catch (error) { 
        }
    })

    afterEach(async () => {
        try {
          User.drop()
        } catch (error) {
        }
    })
   it('should fail when no authorization head is present', async () => {
        const res = await request(app)
          .delete('/api/users/delete')
          .send()
          .expect(401)
   })
   it('should fail when invalid token is sent', async () => {
      const res = await request(app)
        .delete('/api/users/delete')
        .auth('123', { type: 'bearer' })
        .send()
        .expect(401)
   })
   it('should delete the user', async () => {
    const user = await createUser({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@test.com',
        password: bcrypt.hashSync('Test123!', 10)
    })

    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET!)

    const res = await request(app)
      .delete('/api/users/delete')
      .auth(token, { type: 'bearer'})
      .send()
      .expect(204)
   })
   it('should soft delete the user', async () => {
    const user = await createUser({
        firstName: "Test",
        lastName: "User",
        email: 'test@test.com',
        password: bcrypt.hashSync('Test123!', 10)
    })

    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET!)

    const res = await request(app)
      .delete('/api/users/delete')
      .auth(token, { type: 'bearer'})
      .send()
      .expect(204)

    const deleteUser = (await User.findOne({
        where: { id: user.id },
        paranoid: false
    }))?.toJSON()

    expect(deleteUser).toBeTruthy()
    expect(deleteUser.id).toEqual(user.id)
    expect(deleteUser.firstName).toEqual(user.firstName)
      
   })
})