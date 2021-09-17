import { app } from '@/main/config/app'
import { clearDatabase, closeDatabase, connect } from '@/tests/infra/mongodb/mocks'
import { signUpSetup } from '@/tests/main/routes/setup'
import { UserEntity as UserRepoModel, UserAttrs } from '@/infra/mongodb/entities'
import { User } from '@/data/entities'
import { GenderType, UserData } from '@/domain/models'

import MongoMemoryServer from 'mongodb-memory-server-core'
import { Mongoose } from 'mongoose'
import request from 'supertest'

const makeNewUser = async (user: UserData): Promise<string> => {
  const userAttrs: UserAttrs = new User(user)
  const newUser = UserRepoModel.build(userAttrs)
  const saved = await newUser.save()
  return saved._id.toString()
}

describe('User Routes', () => {
  let mongoServer: MongoMemoryServer
  let mongoOrm: Mongoose
  let user: UserData
  let accessToken: string

  beforeAll(async () => {
    const db = await connect()
    mongoServer = db.mongoServer
    mongoOrm = db.mongoOrm
  })

  beforeEach(async () => {
    const { id, accessToken: token } = await signUpSetup({
      email: 'test@test.com', password: '1234'
    })
    accessToken = token
    user = {
      accountId: id,
      gender: GenderType.masculine,
      age: 32,
      height: 173,
      initialWeight: 69,
      physicalActivityLevel: 1.725
    }
  })

  afterEach(async () => {
    await clearDatabase(mongoOrm.connection.collections)
  })

  afterAll(async () => {
    await closeDatabase({ mongoServer, mongoOrm })
  })

  it('POST /api/users - should return 201 with the new user ID', async () => {
    const { accountId, ...userInput } = user

    const { status, body } = await request(app)
      .post('/api/users')
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)
      .send(userInput)

    expect(status).toBe(201)
    expect(body.id).toBeDefined()
  })

  it('GET /api/users - should return 200 with the number of returned items and list of users', async () => {
    const userId1 = await makeNewUser(user)
    const userId2 = await makeNewUser(user)

    const { status, body } = await request(app)
      .get('/api/users')
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)

    expect(status).toBe(200)
    expect(body.items).toBe(2)
    expect(body.data[0].id).toBe(userId1)
    expect(body.data[1].id).toBe(userId2)
    expect(body.data[2]).toBeUndefined()
  })

  it('GET /api/users/:id - should return 200 with user', async () => {
    const userId1 = await makeNewUser(user)

    const { status, body } = await request(app)
      .get(`/api/users/${userId1}`)
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)

    expect(status).toBe(200)
    expect(body.id).toBe(userId1)
  })

  it('PATCH /api/users/:id - should return 200 with updated user', async () => {
    const userId1 = await makeNewUser(user)

    const { status, body } = await request(app)
      .patch(`/api/users/${userId1}`)
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)
      .send({ age: 17 })

    expect(status).toBe(200)
    expect(body.id).toBe(userId1)
    expect(body.age).toBe(17)
  })

  it('DELETE /api/users/:id - should return 200 with updated user', async () => {
    const userId1 = await makeNewUser(user)

    const { status, body } = await request(app)
      .delete(`/api/users/${userId1}`)
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)

    expect(status).toBe(200)
    expect(body.id).toBe(userId1)

    const findUser = await UserRepoModel.findById({ _id: userId1 })

    expect(findUser).toBe(null)
  })
})
