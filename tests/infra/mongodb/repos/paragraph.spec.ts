import { Paragraph } from '@/data/entities'
import { ParagraphData } from '@/domain/models'
import { ParagraphAttrs, ParagraphEntity as ParagraphRepoModel } from '@/infra/mongodb/entities'
import { MongoDbRepository } from '@/infra/mongodb/repos'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'
import { clearDatabase, closeDatabase, connect } from '@/tests/infra/mongodb/mocks'

import MongoMemoryServer from 'mongodb-memory-server-core'
import { Mongoose } from 'mongoose'

const makeNewParagraph = async (paragraph: ParagraphData): Promise<string> => {
  const paragraphAttrs: ParagraphAttrs = new Paragraph(paragraph)
  const newParagraph = ParagraphRepoModel.build(paragraphAttrs)
  const saved = await newParagraph.save()
  return saved._id.toString()
}

describe('MongoDbRepository', () => {
  let mongoServer: MongoMemoryServer
  let mongoOrm: Mongoose
  let paragraphData: ParagraphData
  let paragraph: Paragraph
  let sut: MongoDbRepository

  beforeAll(async () => {
    paragraphData = {
      paragraph: 'any_paragraph'
    }
    paragraph = new Paragraph(paragraphData)
    const db = await connect()
    mongoServer = db.mongoServer
    mongoOrm = db.mongoOrm
  })

  afterAll(async () => {
    await closeDatabase({ mongoServer, mongoOrm })
  })

  beforeEach(async () => {
    await clearDatabase(mongoOrm.connection.collections)
    sut = await MongoDbRepository.init('@/infra/mongodb/entities', MongoDbRepoTypes.paragraph)
  })

  describe('create', () => {
    it('should create an paragraph and return an id', async () => {
      const id = await sut.create(paragraph)

      const createdParagraph = await ParagraphRepoModel.findById({ _id: id })

      expect(createdParagraph).toBeDefined()
    })
  })

  describe('find', () => {
    it('should return a list of paragraphs', async () => {
      const idParagraph1 = await makeNewParagraph(paragraph)
      const idParagraph2 = await makeNewParagraph(paragraph)

      const paragraphs = await sut.find({})

      expect(paragraphs.items).toBe(2)
      expect(paragraphs.data[0].id).toBe(idParagraph1)
      expect(paragraphs.data[1].id).toBe(idParagraph2)
    })
  })

  describe('findById', () => {
    it('should return an paragraph', async () => {
      const paragraphId = await makeNewParagraph(paragraph)

      const paragraphFound = await sut.findById(paragraphId)

      expect(paragraphFound.id).toBe(paragraphId)
    })
  })

  describe('findByIdAndUpdate', () => {
    it('should findById and update an paragraph', async () => {
      const paragraphId = await makeNewParagraph(paragraph)

      const paragraphFound = await sut.findByIdAndUpdate(paragraphId, { paragraph: 'new_paragraph' })

      expect(paragraphFound.paragraph).toBe('new_paragraph')
    })
  })

  describe('findByIdAndDelete', () => {
    it('should findById and delete an paragraph', async () => {
      const paragraphId = await makeNewParagraph(paragraph)
      const paragraphsFind1 = await sut.find({})

      const paragraphDeletedId = await sut.findByIdAndDelete(paragraphId)
      const paragraphsFind2 = await sut.find({})

      expect(paragraphId).toBe(paragraphDeletedId)
      expect(paragraphsFind1.items).toBe(1)
      expect(paragraphsFind2.items).toBe(0)
    })
  })
})
