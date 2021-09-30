import { app } from '@/main/config/app'
import { clearDatabase, closeDatabase, connect } from '@/tests/infra/mongodb/mocks'
import { signUpSetup } from '@/tests/main/routes/setup'
import { ParagraphEntity as ParagraphRepoModel, ParagraphAttrs } from '@/infra/mongodb/entities'
import { Paragraph } from '@/data/entities'
import { ParagraphData, RoleType } from '@/domain/models'

import MongoMemoryServer from 'mongodb-memory-server-core'
import { Mongoose } from 'mongoose'
import request from 'supertest'

const makeNewParagraph = async (paragraph: ParagraphData): Promise<string> => {
  const paragraphAttrs: ParagraphAttrs = new Paragraph(paragraph)
  const newParagraph = ParagraphRepoModel.build(paragraphAttrs)
  const saved = await newParagraph.save()
  return saved._id.toString()
}

describe('Paragraph Routes', () => {
  let mongoServer: MongoMemoryServer
  let mongoOrm: Mongoose
  let paragraph: ParagraphData
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
    paragraph = {
      paragraph: 'any_paragraph'
    }
  })

  afterEach(async () => {
    await clearDatabase(mongoOrm.connection.collections)
  })

  afterAll(async () => {
    await closeDatabase({ mongoServer, mongoOrm })
  })

  it('POST /api/paragraphs - should return 201 with the new paragraph ID', async () => {
    const { accessToken: adminToken } = await signUpSetup({
      email: 'test@test.com', password: '1234', role: RoleType.admin
    })
    const { status, body } = await request(app)
      .post('/api/paragraphs')
      .set('Accept', 'application/json')
      .set('Authorization', adminToken)
      .send(paragraph)

    expect(status).toBe(201)
    expect(body.id).toBeDefined()
  })

  it('GET /api/paragraphs - should return 200 with the number of returned items and list of paragraphs', async () => {
    const paragraphId1 = await makeNewParagraph(paragraph)
    const paragraphId2 = await makeNewParagraph(paragraph)

    const { status, body } = await request(app)
      .get('/api/paragraphs')
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)

    expect(status).toBe(200)
    expect(body.items).toBe(2)
    expect(body.data[0].id).toBe(paragraphId1)
    expect(body.data[1].id).toBe(paragraphId2)
    expect(body.data[2]).toBeUndefined()
  })

  it('GET /api/paragraphs/:id - should return 200 with paragraph', async () => {
    const paragraphId1 = await makeNewParagraph(paragraph)

    const { status, body } = await request(app)
      .get(`/api/paragraphs/${paragraphId1}`)
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)

    expect(status).toBe(200)
    expect(body.id).toBe(paragraphId1)
  })

  it('PATCH /api/paragraphs/:id - should return 200 with updated paragraph', async () => {
    const paragraphId1 = await makeNewParagraph(paragraph)

    const { status, body } = await request(app)
      .patch(`/api/paragraphs/${paragraphId1}`)
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)
      .send({
        paragraph: 'new_paragraph'
      })

    expect(status).toBe(200)
    expect(body.id).toBe(paragraphId1)
    expect(body.paragraph).toBe('new_paragraph')
  })

  it('DELETE /api/paragraphs/:id - should return 200 with updated paragraph', async () => {
    const { accessToken: adminToken } = await signUpSetup({
      email: 'test@test.com', password: '1234', role: RoleType.admin
    })
    const paragraphId1 = await makeNewParagraph(paragraph)

    const { status, body } = await request(app)
      .delete(`/api/paragraphs/${paragraphId1}`)
      .set('Accept', 'application/json')
      .set('Authorization', adminToken)

    expect(status).toBe(200)
    expect(body.id).toBe(paragraphId1)

    const findParagraph = await ParagraphRepoModel.findById({ _id: paragraphId1 })

    expect(findParagraph).toBe(null)
  })
})
