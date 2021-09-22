import { Event } from '@/data/entities'
import { EventData } from '@/domain/models'
import { EventAttrs, EventEntity as EventRepoModel } from '@/infra/mongodb/entities'
import { MongoDbRepository } from '@/infra/mongodb/repos'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'
import { clearDatabase, closeDatabase, connect } from '@/tests/infra/mongodb/mocks'

import MongoMemoryServer from 'mongodb-memory-server-core'
import { Mongoose } from 'mongoose'

const makeNewEvent = async (event: EventData): Promise<string> => {
  const eventAttrs: EventAttrs = new Event(event)
  const newEvent = EventRepoModel.build(eventAttrs)
  const saved = await newEvent.save()
  return saved._id.toString()
}

describe('MongoDbRepository', () => {
  let mongoServer: MongoMemoryServer
  let mongoOrm: Mongoose
  let eventData: EventData
  let event: Event
  let sut: MongoDbRepository

  beforeAll(async () => {
    eventData = {
      weekDay: 'any_weekDay',
      dayMonth: 'any_dayMonth',
      city: 'any_city',
      local: 'any_local'
    }
    event = new Event(eventData)
    const db = await connect()
    mongoServer = db.mongoServer
    mongoOrm = db.mongoOrm
  })

  afterAll(async () => {
    await closeDatabase({ mongoServer, mongoOrm })
  })

  beforeEach(async () => {
    await clearDatabase(mongoOrm.connection.collections)
    sut = await MongoDbRepository.init('@/infra/mongodb/entities', MongoDbRepoTypes.event)
  })

  describe('create', () => {
    it('should create an event and return an id', async () => {
      const id = await sut.create(event)

      const createdEvent = await EventRepoModel.findById({ _id: id })

      expect(createdEvent).toBeDefined()
    })
  })

  describe('find', () => {
    it('should return a list of events', async () => {
      const idEvent1 = await makeNewEvent(event)
      const idEvent2 = await makeNewEvent(event)

      const events = await sut.find({})

      expect(events.items).toBe(2)
      expect(events.data[0].id).toBe(idEvent1)
      expect(events.data[1].id).toBe(idEvent2)
    })
  })

  describe('findById', () => {
    it('should return an event', async () => {
      const eventId = await makeNewEvent(event)

      const eventFound = await sut.findById(eventId)

      expect(eventFound.id).toBe(eventId)
    })
  })

  describe('findByIdAndUpdate', () => {
    it('should findById and update an event', async () => {
      const eventId = await makeNewEvent(event)

      const eventFound = await sut.findByIdAndUpdate(eventId, { local: 'new_local' })

      expect(eventFound.local).toBe('new_local')
    })
  })

  describe('findByIdAndDelete', () => {
    it('should findById and delete an event', async () => {
      const eventId = await makeNewEvent(event)
      const eventsFind1 = await sut.find({})

      const eventDeletedId = await sut.findByIdAndDelete(eventId)
      const eventsFind2 = await sut.find({})

      expect(eventId).toBe(eventDeletedId)
      expect(eventsFind1.items).toBe(1)
      expect(eventsFind2.items).toBe(0)
    })
  })
})
