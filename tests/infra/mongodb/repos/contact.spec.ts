import { Contact } from '@/data/entities'
import { ContactData } from '@/domain/models'
import { ContactAttrs, ContactEntity as ContactRepoModel } from '@/infra/mongodb/entities'
import { MongoDbRepository } from '@/infra/mongodb/repos'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'
import { clearDatabase, closeDatabase, connect } from '@/tests/infra/mongodb/mocks'

import MongoMemoryServer from 'mongodb-memory-server-core'
import { Mongoose } from 'mongoose'

const makeNewContact = async (contact: ContactData): Promise<string> => {
  const contactAttrs: ContactAttrs = new Contact(contact)
  const newContact = ContactRepoModel.build(contactAttrs)
  const saved = await newContact.save()
  return saved._id.toString()
}

describe('MongoDbRepository', () => {
  let mongoServer: MongoMemoryServer
  let mongoOrm: Mongoose
  let contactData: ContactData
  let contact: Contact
  let sut: MongoDbRepository

  beforeAll(async () => {
    contactData = {
      message: 'any_message',
      email: 'any_email',
      eventManager: 'any_eventManager',
      phone: 'any_phone'
    }
    contact = new Contact(contactData)
    const db = await connect()
    mongoServer = db.mongoServer
    mongoOrm = db.mongoOrm
  })

  afterAll(async () => {
    await closeDatabase({ mongoServer, mongoOrm })
  })

  beforeEach(async () => {
    await clearDatabase(mongoOrm.connection.collections)
    sut = await MongoDbRepository.init('@/infra/mongodb/entities', MongoDbRepoTypes.contact)
  })

  describe('create', () => {
    it('should create an contact and return an id', async () => {
      const id = await sut.create(contact)

      const createdContact = await ContactRepoModel.findById({ _id: id })

      expect(createdContact).toBeDefined()
    })
  })

  describe('find', () => {
    it('should return a list of contacts', async () => {
      const idContact1 = await makeNewContact(contact)
      const idContact2 = await makeNewContact(contact)

      const contacts = await sut.find({})

      expect(contacts.items).toBe(2)
      expect(contacts.data[0].id).toBe(idContact1)
      expect(contacts.data[1].id).toBe(idContact2)
    })
  })

  describe('findById', () => {
    it('should return an contact', async () => {
      const contactId = await makeNewContact(contact)

      const contactFound = await sut.findById(contactId)

      expect(contactFound.id).toBe(contactId)
    })
  })

  describe('findByIdAndUpdate', () => {
    it('should findById and update an contact', async () => {
      const contactId = await makeNewContact(contact)

      const contactFound = await sut.findByIdAndUpdate(contactId, { phone: 'new_phone' })

      expect(contactFound.phone).toBe('new_phone')
    })
  })

  describe('findByIdAndDelete', () => {
    it('should findById and delete an contact', async () => {
      const contactId = await makeNewContact(contact)
      const contactsFind1 = await sut.find({})

      const contactDeletedId = await sut.findByIdAndDelete(contactId)
      const contactsFind2 = await sut.find({})

      expect(contactId).toBe(contactDeletedId)
      expect(contactsFind1.items).toBe(1)
      expect(contactsFind2.items).toBe(0)
    })
  })
})
