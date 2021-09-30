import { app } from '@/main/config/app'
import { clearDatabase, closeDatabase, connect } from '@/tests/infra/mongodb/mocks'
import { signUpSetup } from '@/tests/main/routes/setup'
import { ContactEntity as ContactRepoModel, ContactAttrs } from '@/infra/mongodb/entities'
import { Contact } from '@/data/entities'
import { ContactData, RoleType } from '@/domain/models'

import MongoMemoryServer from 'mongodb-memory-server-core'
import { Mongoose } from 'mongoose'
import request from 'supertest'

const makeNewContact = async (contact: ContactData): Promise<string> => {
  const contactAttrs: ContactAttrs = new Contact(contact)
  const newContact = ContactRepoModel.build(contactAttrs)
  const saved = await newContact.save()
  return saved._id.toString()
}

describe('Contact Routes', () => {
  let mongoServer: MongoMemoryServer
  let mongoOrm: Mongoose
  let contact: ContactData
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
    contact = {
      message: 'any_message',
      email: 'any_email',
      eventManager: 'any_eventManager',
      phone: 'any_phone'
    }
  })

  afterEach(async () => {
    await clearDatabase(mongoOrm.connection.collections)
  })

  afterAll(async () => {
    await closeDatabase({ mongoServer, mongoOrm })
  })

  it('POST /api/contacts - should return 201 with the new contact ID', async () => {
    const { accessToken: adminToken } = await signUpSetup({
      email: 'test@test.com', password: '1234', role: RoleType.admin
    })
    const { status, body } = await request(app)
      .post('/api/contacts')
      .set('Accept', 'application/json')
      .set('Authorization', adminToken)
      .send(contact)

    expect(status).toBe(201)
    expect(body.id).toBeDefined()
  })

  it('GET /api/contacts - should return 200 with the number of returned items and list of contacts', async () => {
    const contactId1 = await makeNewContact(contact)
    const contactId2 = await makeNewContact(contact)

    const { status, body } = await request(app)
      .get('/api/contacts')
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)

    expect(status).toBe(200)
    expect(body.items).toBe(2)
    expect(body.data[0].id).toBe(contactId1)
    expect(body.data[1].id).toBe(contactId2)
    expect(body.data[2]).toBeUndefined()
  })

  it('GET /api/contacts/:id - should return 200 with contact', async () => {
    const contactId1 = await makeNewContact(contact)

    const { status, body } = await request(app)
      .get(`/api/contacts/${contactId1}`)
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)

    expect(status).toBe(200)
    expect(body.id).toBe(contactId1)
  })

  it('PATCH /api/contacts/:id - should return 200 with updated contact', async () => {
    const contactId1 = await makeNewContact(contact)

    const { status, body } = await request(app)
      .patch(`/api/contacts/${contactId1}`)
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)
      .send({
        message: 'any_message',
        email: 'any_email',
        eventManager: 'any_eventManager',
        phone: 'new_phone'
      })

    expect(status).toBe(200)
    expect(body.id).toBe(contactId1)
    expect(body.phone).toBe('new_phone')
  })

  it('DELETE /api/contacts/:id - should return 200 with updated contact', async () => {
    const { accessToken: adminToken } = await signUpSetup({
      email: 'test@test.com', password: '1234', role: RoleType.admin
    })
    const contactId1 = await makeNewContact(contact)

    const { status, body } = await request(app)
      .delete(`/api/contacts/${contactId1}`)
      .set('Accept', 'application/json')
      .set('Authorization', adminToken)

    expect(status).toBe(200)
    expect(body.id).toBe(contactId1)

    const findContact = await ContactRepoModel.findById({ _id: contactId1 })

    expect(findContact).toBe(null)
  })
})
