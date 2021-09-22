import { app } from '@/main/config/app'
import { clearDatabase, closeDatabase, connect } from '@/tests/infra/mongodb/mocks'
import { signUpSetup } from '@/tests/main/routes/setup'
import { SectionEntity as SectionRepoModel, SectionAttrs } from '@/infra/mongodb/entities'
import { Section } from '@/data/entities'
import { SectionData } from '@/domain/models'

import MongoMemoryServer from 'mongodb-memory-server-core'
import { Mongoose } from 'mongoose'
import request from 'supertest'

const makeNewSection = async (section: SectionData): Promise<string> => {
  const sectionAttrs: SectionAttrs = new Section(section)
  const newSection = SectionRepoModel.build(sectionAttrs)
  const saved = await newSection.save()
  return saved._id.toString()
}

describe('Section Routes', () => {
  let mongoServer: MongoMemoryServer
  let mongoOrm: Mongoose
  let section: SectionData
  let accessToken: string

  beforeAll(async () => {
    const db = await connect()
    mongoServer = db.mongoServer
    mongoOrm = db.mongoOrm
  })

  beforeEach(async () => {
    const { accessToken: token } = await signUpSetup({
      email: 'test@test.com', password: '1234'
    })
    accessToken = token
    section = {
      menuName: 'any_menuName',
      entityName: 'any_entityName',
      sectionTitle: 'any_sectionTitle'
    }
  })

  afterEach(async () => {
    await clearDatabase(mongoOrm.connection.collections)
  })

  afterAll(async () => {
    await closeDatabase({ mongoServer, mongoOrm })
  })

  it('POST /api/sections - should return 201 with the new section ID', async () => {
    const { status, body } = await request(app)
      .post('/api/sections')
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)
      .send(section)

    expect(status).toBe(201)
    expect(body.id).toBeDefined()
  })

  it('GET /api/sections - should return 200 with the number of returned items and list of sections', async () => {
    const sectionId1 = await makeNewSection(section)
    const sectionId2 = await makeNewSection(section)

    const { status, body } = await request(app)
      .get('/api/sections')
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)

    expect(status).toBe(200)
    expect(body.items).toBe(2)
    expect(body.data[0].id).toBe(sectionId1)
    expect(body.data[1].id).toBe(sectionId2)
    expect(body.data[2]).toBeUndefined()
  })

  it('GET /api/sections/:id - should return 200 with section', async () => {
    const sectionId1 = await makeNewSection(section)

    const { status, body } = await request(app)
      .get(`/api/sections/${sectionId1}`)
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)

    expect(status).toBe(200)
    expect(body.id).toBe(sectionId1)
  })

  it('PATCH /api/sections/:id - should return 200 with updated section', async () => {
    const sectionId1 = await makeNewSection(section)

    const { status, body } = await request(app)
      .patch(`/api/sections/${sectionId1}`)
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)
      .send({
        menuName: 'any_menuName',
        entityName: 'any_entityName',
        sectionTitle: 'new_sectionTitle'
      })

    expect(status).toBe(200)
    expect(body.id).toBe(sectionId1)
    expect(body.sectionTitle).toBe('new_sectionTitle')
  })

  it('DELETE /api/sections/:id - should return 200 with updated section', async () => {
    const sectionId1 = await makeNewSection(section)

    const { status, body } = await request(app)
      .delete(`/api/sections/${sectionId1}`)
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)

    expect(status).toBe(200)
    expect(body.id).toBe(sectionId1)

    const findSection = await SectionRepoModel.findById({ _id: sectionId1 })

    expect(findSection).toBe(null)
  })
})
