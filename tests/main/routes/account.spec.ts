import { RoleType } from '@/domain/models'
import { app } from '@/main/config/app'
import { clearDatabase, closeDatabase, connect } from '@/tests/infra/mongodb/mocks'
import { signUpSetup } from '@/tests/main/routes/setup'

import MongoMemoryServer from 'mongodb-memory-server-core'
import { Mongoose } from 'mongoose'
import request from 'supertest'

describe('Account Routes', () => {
  let mongoServer: MongoMemoryServer
  let mongoOrm: Mongoose

  beforeAll(async () => {
    const db = await connect()
    mongoServer = db.mongoServer
    mongoOrm = db.mongoOrm
  })

  afterEach(async () => {
    await clearDatabase(mongoOrm.connection.collections)
  })

  afterAll(async () => {
    await closeDatabase({ mongoServer, mongoOrm })
  })

  it('POST /api/sign-up - should return 201 with an accessToken', async () => {
    const { status, body } = await request(app)
      .post('/api/sign-up')
      .set('Accept', 'application/json')
      .send({
        name: 'Davi Schilling',
        phone: '3272637458',
        password: '1234',
        repeat_password: '1234',
        email: 'test@test.com'
      })

    expect(status).toBe(201)
    expect(body.accessToken).toBeDefined()
  })

  it('POST /api/sign-in - should return 200 with an accessToken', async () => {
    await request(app)
      .post('/api/sign-up')
      .set('Accept', 'application/json')
      .send({
        password: '1234',
        repeat_password: '1234',
        email: 'test@test.com'
      })

    const { status, body } = await request(app)
      .post('/api/sign-in')
      .set('Accept', 'application/json')
      .send({ email: 'test@test.com', password: '1234' })

    expect(status).toBe(200)
    expect(body.accessToken).toBeDefined()
  })

  it('GET /api/current-account - should return 200 with the current account', async () => {
    const { id, accessToken } = await signUpSetup({ email: 'test@test.com', password: '1234' })

    const { status, body } = await request(app)
      .get('/api/current-account')
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)

    expect(status).toBe(200)
    expect(body.id).toBe(id)
  })

  it('PATCH /api/update-account - should return 200 with updated account', async () => {
    const { id, accessToken } = await signUpSetup({
      name: 'Davi Schilling',
      email: 'test@test.com'
    })

    const { status, body } = await request(app)
      .patch('/api/update-account')
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)
      .send({
        name: 'Davi Batista Schilling'
      })

    expect(status).toBe(200)
    expect(body.id).toBe(id)
    expect(body.name).toBe('Davi Batista Schilling')
  })

  it('PATCH /api/update-password - should return 200 with the new user ID', async () => {
    const { body: signUpBody } = await request(app)
      .post('/api/sign-up')
      .set('Accept', 'application/json')
      .send({
        password: '1234',
        repeat_password: '1234',
        email: 'test@test.com'
      })

    const { status, body } = await request(app)
      .patch('/api/update-password')
      .set('Accept', 'application/json')
      .set('Authorization', signUpBody.accessToken)
      .send({
        old_password: '1234',
        password: '12345',
        repeat_password: '12345'
      })

    expect(status).toBe(200)
    expect(body.id).toBeDefined()
  })

  it('POST /api/forgot-password - should return 200 with a recoverToken', async () => {
    await signUpSetup({
      password: '1234',
      email: 'test@test.com'
    })

    const { status, body } = await request(app)
      .post('/api/forgot-password')
      .set('Accept', 'application/json')
      .send({ email: 'test@test.com' })

    expect(status).toBe(200)
    expect(body.recoverToken).toBeDefined()
  })

  it('POST /api/generate-first-access-recover-token - should return 200 with a recoverToken', async () => {
    const { accessToken: adminToken } = await signUpSetup({
      password: '1234',
      email: 'test@test.com',
      role: RoleType.admin
    })

    const { status, body } = await request(app)
      .post('/api/generate-first-access-recover-token')
      .set('Accept', 'application/json')
      .set('Authorization', adminToken)
      .send({ email: 'user@email.com' })

    expect(status).toBe(200)
    expect(body.recoverToken).toBeDefined()
  })

  it('POST /api/generate-recover-token - should return 200 with a recoverToken', async () => {
    const { accessToken: adminToken } = await signUpSetup({
      password: '1234',
      email: 'test@test.com',
      role: RoleType.admin
    })
    await signUpSetup({
      password: '1234',
      email: 'user@email.com'
    })

    const { status, body } = await request(app)
      .post('/api/generate-recover-token')
      .set('Accept', 'application/json')
      .set('Authorization', adminToken)
      .send({ email: 'user@email.com' })

    expect(status).toBe(200)
    expect(body.recoverToken).toBeDefined()
  })

  it('POST /api/create-admin-account - should return 201 with an admin accessToken', async () => {
    const { status, body } = await request(app)
      .post('/api/create-admin-account')
      .set('Accept', 'application/json')
      .set('secret', process.env.SECRET as string ?? 'secret')
      .send({ email: 'test@test.com' })

    expect(status).toBe(201)
    expect(body.accessToken).toBeDefined()
  })

  it('POST /api/sign-in-admin-account - should return 200 with an accessToken', async () => {
    await signUpSetup({
      password: '1234',
      email: 'test@test.com',
      role: RoleType.admin
    })

    const { status, body } = await request(app)
      .post('/api/sign-in-admin-account')
      .set('Accept', 'application/json')
      .set('secret', process.env.SECRET as string ?? 'secret')
      .send({ email: 'test@test.com' })

    expect(status).toBe(200)
    expect(body.accessToken).toBeDefined()
  })

  describe('POST /api/recover-password', () => {
    it('/api/forgot-password - should return 200 with an accessToken', async () => {
      await signUpSetup({
        password: '1234',
        email: 'test@test.com'
      })

      const { body: forgotBody } = await request(app)
        .post('/api/forgot-password')
        .set('Accept', 'application/json')
        .send({ email: 'test@test.com' })

      const { status, body } = await request(app)
        .post('/api/recover-password')
        .set('Accept', 'application/json')
        .set('Authorization', forgotBody.recoverToken)
        .send({
          password: '12345',
          repeat_password: '12345'
        })

      expect(status).toBe(200)
      expect(body.accessToken).toBeDefined()
    })
  })

  it('/api/generate-first-access-recover-token - should return 200 with an accessToken', async () => {
    const { accessToken: adminToken } = await signUpSetup({
      password: '1234',
      email: 'test@test.com',
      role: RoleType.admin
    })

    const { body: firstAccessBody } = await request(app)
      .post('/api/generate-first-access-recover-token')
      .set('Accept', 'application/json')
      .set('Authorization', adminToken)
      .send({ email: 'user@email.com' })

    const { status, body } = await request(app)
      .post('/api/recover-password')
      .set('Accept', 'application/json')
      .set('Authorization', firstAccessBody.recoverToken)
      .send({
        password: '12345',
        repeat_password: '12345'
      })

    expect(status).toBe(200)
    expect(body.accessToken).toBeDefined()
  })

  it('/api/generate-recover-token - should return 200 with an accessToken', async () => {
    const { accessToken: adminToken } = await signUpSetup({
      password: '1234',
      email: 'test@test.com',
      role: RoleType.admin
    })
    await signUpSetup({
      password: '1234',
      email: 'user@email.com'
    })

    const { body: generateBody } = await request(app)
      .post('/api/generate-recover-token')
      .set('Accept', 'application/json')
      .set('Authorization', adminToken)
      .send({ email: 'user@email.com' })

    const { status, body } = await request(app)
      .post('/api/recover-password')
      .set('Accept', 'application/json')
      .set('Authorization', generateBody.recoverToken)
      .send({
        password: '12345',
        repeat_password: '12345'
      })

    expect(status).toBe(200)
    expect(body.accessToken).toBeDefined()
  })
})
