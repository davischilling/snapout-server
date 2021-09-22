import { app } from '@/main/config/app'
import { clearDatabase, closeDatabase, connect } from '@/tests/infra/mongodb/mocks'
import { signUpSetup } from '@/tests/main/routes/setup'
import { EventEntity as EventRepoModel, EventAttrs } from '@/infra/mongodb/entities'
import { Event } from '@/data/entities'
import { EventData } from '@/domain/models'

import MongoMemoryServer from 'mongodb-memory-server-core'
import { Mongoose } from 'mongoose'
import request from 'supertest'

const makeNewEvent = async (event: EventData): Promise<string> => {
  const eventAttrs: EventAttrs = new Event(event)
  const newEvent = EventRepoModel.build(eventAttrs)
  const saved = await newEvent.save()
  return saved._id.toString()
}

describe('Event Routes', () => {
  let mongoServer: MongoMemoryServer
  let mongoOrm: Mongoose
  let event: EventData
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
    event = {
      weekDay: 'any_weekDay',
      dayMonth: 'any_dayMonth',
      city: 'any_city',
      local: 'any_local'
    }
  })

  afterEach(async () => {
    await clearDatabase(mongoOrm.connection.collections)
  })

  afterAll(async () => {
    await closeDatabase({ mongoServer, mongoOrm })
  })

  it('POST /api/events - should return 201 with the new event ID', async () => {
    const { status, body } = await request(app)
      .post('/api/events')
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)
      .send(event)

    expect(status).toBe(201)
    expect(body.id).toBeDefined()
  })

  it('GET /api/events - should return 200 with the number of returned items and list of events', async () => {
    const eventId1 = await makeNewEvent(event)
    const eventId2 = await makeNewEvent(event)

    const { status, body } = await request(app)
      .get('/api/events')
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)

    expect(status).toBe(200)
    expect(body.items).toBe(2)
    expect(body.data[0].id).toBe(eventId1)
    expect(body.data[1].id).toBe(eventId2)
    expect(body.data[2]).toBeUndefined()
  })

  it('GET /api/events/:id - should return 200 with event', async () => {
    const eventId1 = await makeNewEvent(event)

    const { status, body } = await request(app)
      .get(`/api/events/${eventId1}`)
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)

    expect(status).toBe(200)
    expect(body.id).toBe(eventId1)
  })

  it('PATCH /api/events/:id - should return 200 with updated event', async () => {
    const eventId1 = await makeNewEvent(event)

    const { status, body } = await request(app)
      .patch(`/api/events/${eventId1}`)
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)
      .send({
        weekDay: 'any_weekDay',
        dayMonth: 'any_dayMonth',
        city: 'any_city',
        local: 'new_local'
      })

    expect(status).toBe(200)
    expect(body.id).toBe(eventId1)
    expect(body.local).toBe('new_local')
  })

  it('DELETE /api/events/:id - should return 200 with updated event', async () => {
    const eventId1 = await makeNewEvent(event)

    const { status, body } = await request(app)
      .delete(`/api/events/${eventId1}`)
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)

    expect(status).toBe(200)
    expect(body.id).toBe(eventId1)

    const findEvent = await EventRepoModel.findById({ _id: eventId1 })

    expect(findEvent).toBe(null)
  })
})
