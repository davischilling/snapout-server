import { Section } from '@/data/entities'
import { SectionData } from '@/domain/models'
import { SectionAttrs, SectionEntity as SectionRepoModel } from '@/infra/mongodb/entities'
import { MongoDbRepository } from '@/infra/mongodb/repos'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'
import { clearDatabase, closeDatabase, connect } from '@/tests/infra/mongodb/mocks'

import MongoMemoryServer from 'mongodb-memory-server-core'
import { Mongoose } from 'mongoose'

const makeNewSection = async (section: SectionData): Promise<string> => {
  const sectionAttrs: SectionAttrs = new Section(section)
  const newSection = SectionRepoModel.build(sectionAttrs)
  const saved = await newSection.save()
  return saved._id.toString()
}

describe('MongoDbRepository', () => {
  let mongoServer: MongoMemoryServer
  let mongoOrm: Mongoose
  let sectionData: SectionData
  let section: Section
  let sut: MongoDbRepository

  beforeAll(async () => {
    sectionData = {
      menuName: 'any_menuName',
      entityName: 'any_entityName',
      sectionTitle: 'any_sectionTitle'
    }
    section = new Section(sectionData)
    const db = await connect()
    mongoServer = db.mongoServer
    mongoOrm = db.mongoOrm
  })

  afterAll(async () => {
    await closeDatabase({ mongoServer, mongoOrm })
  })

  beforeEach(async () => {
    await clearDatabase(mongoOrm.connection.collections)
    sut = await MongoDbRepository.init('@/infra/mongodb/entities', MongoDbRepoTypes.section)
  })

  describe('create', () => {
    it('should create an section and return an id', async () => {
      const id = await sut.create(section)

      const createdSection = await SectionRepoModel.findById({ _id: id })

      expect(createdSection).toBeDefined()
    })
  })

  describe('find', () => {
    it('should return a list of sections', async () => {
      const idSection1 = await makeNewSection(section)
      const idSection2 = await makeNewSection(section)

      const sections = await sut.find({})

      expect(sections.items).toBe(2)
      expect(sections.data[0].id).toBe(idSection1)
      expect(sections.data[1].id).toBe(idSection2)
    })
  })

  describe('findById', () => {
    it('should return an section', async () => {
      const sectionId = await makeNewSection(section)

      const sectionFound = await sut.findById(sectionId)

      expect(sectionFound.id).toBe(sectionId)
    })
  })

  describe('findByIdAndUpdate', () => {
    it('should findById and update an section', async () => {
      const sectionId = await makeNewSection(section)

      const sectionFound = await sut.findByIdAndUpdate(sectionId, { sectionTitle: 'new_sectionTitle' })

      expect(sectionFound.sectionTitle).toBe('new_sectionTitle')
    })
  })

  describe('findByIdAndDelete', () => {
    it('should findById and delete an section', async () => {
      const sectionId = await makeNewSection(section)
      const sectionsFind1 = await sut.find({})

      const sectionDeletedId = await sut.findByIdAndDelete(sectionId)
      const sectionsFind2 = await sut.find({})

      expect(sectionId).toBe(sectionDeletedId)
      expect(sectionsFind1.items).toBe(1)
      expect(sectionsFind2.items).toBe(0)
    })
  })
})
