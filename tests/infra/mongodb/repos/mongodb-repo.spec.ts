import { NotFoundError, ServerError } from '@/application/errors'
import { MongoDbRepository, RepoDoc } from '@/infra/mongodb/repos'
import { clearDatabase, closeDatabase, connect } from '@/tests/infra/mongodb/mocks'
import Repo from '@/tests/infra/mongodb/mocks/repo'

import MongoMemoryServer from 'mongodb-memory-server-core'
import mongoose, { DocumentDefinition, Mongoose } from 'mongoose'

const makeNewRepoItem = async (params: any): Promise<RepoDoc> => {
  const newRepo = Repo.build(params)
  return await newRepo.save()
}

describe('MongoDbRepository', () => {
  let sut: MongoDbRepository
  let mongoServer: MongoMemoryServer
  let mongoOrm: Mongoose

  beforeAll(async () => {
    const db = await connect()
    mongoServer = db.mongoServer
    mongoOrm = db.mongoOrm
  })

  afterAll(async () => {
    await closeDatabase({ mongoServer, mongoOrm })
  })

  describe('init', () => {
    beforeEach(async () => {
      await clearDatabase(mongoOrm.connection.collections)
      sut = await MongoDbRepository.init('@/tests/infra/mongodb/mocks', 'repo')
    })

    it('should import the correct entity and return a new repo instance', async () => {
      sut = await MongoDbRepository.init('@/tests/infra/mongodb/mocks', 'repo')

      expect(sut.repo).toBeDefined()
      expect((sut.repo).name).toBe('model')
      expect((sut.repo).modelName).toBe('Repo')
    })

    it('should throw a server error if the entity import returns undefined', async () => {
      const promise = MongoDbRepository.init('@/tests/infra/mongodb', 'invalid_repo')

      await expect(promise).rejects.toThrow(new ServerError())
    })
  })

  describe('docFormat', () => {
    let doc: DocumentDefinition<any>
    let params: any

    beforeEach(async () => {
      await clearDatabase(mongoOrm.connection.collections)
      params = { data: 'any_params' }
      doc = await makeNewRepoItem(params)
      sut = await MongoDbRepository.init('@/tests/infra/mongodb/mocks', 'repo')
    })

    it('should convert the _id into a new string id property', () => {
      const formattedDoc = sut.docFormat(doc)

      expect(formattedDoc.id).toBeDefined()
      expect(formattedDoc.id).toBe.toString()
    })

    it('should exclude the __v and _id properties of the document', () => {
      const formattedDoc = sut.docFormat(doc)

      expect(formattedDoc._id).not.toBeDefined()
      expect(formattedDoc.__v).not.toBeDefined()
    })

    it('should maintain the rest of the document intact', () => {
      const formattedDoc = sut.docFormat(doc)

      expect(formattedDoc.data).toEqual(doc.data)
    })
  })

  describe('create', () => {
    beforeEach(async () => {
      await clearDatabase(mongoOrm.connection.collections)
      sut = await MongoDbRepository.init('@/tests/infra/mongodb/mocks', 'repo')
    })

    it('should call repo.build with correct params', async () => {
      const build = jest.spyOn(sut.repo, 'build')

      await sut.create({ data: 'any' })

      expect(build).toHaveBeenCalledWith({ data: 'any' })
      expect(build).toHaveBeenCalledTimes(1)
    })

    it('build should define the doc attr with a new mongoose doc', async () => {
      await sut.create({ data: 'any' })

      expect((sut.doc as RepoDoc)._id).toBeDefined()
    })

    it('should throw if build returns undefined', async () => {
      jest.spyOn(sut.repo, 'build')
        .mockImplementationOnce(() => undefined as any)

      const promise = sut.create({ data: 'any' })

      await expect(promise).rejects.toThrow(new ServerError())
    })

    it('should rethrow if mongoose.save throws', async () => {
      const newDoc = sut.repo.build({ data: 'any_data' })
      jest.spyOn(newDoc, 'save').mockImplementationOnce(() => { throw new Error('mongoose_error') })
      jest.spyOn(sut.repo, 'build').mockImplementationOnce(() => newDoc)

      const promise = sut.create({ data: 'any_data' })

      await expect(promise).rejects.toThrow(new Error('mongoose_error'))
    })

    it('should save the new instance on db and return an id', async () => {
      const id = await sut.create({ data: 'any' })

      const repo = await Repo.findById(id)

      expect(repo).toBeDefined()
    })
  })

  describe('find', () => {
    beforeEach(async () => {
      await clearDatabase(mongoOrm.connection.collections)
      sut = await MongoDbRepository.init('@/tests/infra/mongodb/mocks', 'repo')
    })

    it('should call repo.find with correct params', async () => {
      const find = jest.spyOn(sut.repo, 'find')

      await sut.find({ data: 'any' })

      expect(find).toHaveBeenCalledWith({ data: 'any' })
      expect(find).toHaveBeenCalledTimes(1)
    })

    it('should rethrow if mongoose.find throws', async () => {
      jest.spyOn(sut.repo, 'find').mockImplementationOnce(() => { throw new Error('mongoose_error') })

      const promise = sut.find({})

      await expect(promise).rejects.toThrow(new Error('mongoose_error'))
    })

    it('should return zero items and empty array if there\'s no saved docs on db', async () => {
      const repos = await sut.find({ data: 'any' })

      expect(repos).toEqual({ items: 0, data: [] })
    })

    it('should return the number of items from db docs', async () => {
      await makeNewRepoItem({ data: 'any' })
      await makeNewRepoItem({ data: 'any' })

      const repos = await sut.find({ data: 'any' })

      expect(repos.items).toBe(2)
      expect(repos.data[0]).toBeDefined()
      expect(repos.data[1]).toBeDefined()
    })

    it('should filter docs correctly', async () => {
      await makeNewRepoItem({ data: 'any' })
      await makeNewRepoItem({ data: 'another_data' })

      const repos = await sut.find({ data: 'any' })

      expect(repos.items).toBe(1)
      expect(repos.data[0]).toBeDefined()
      expect(repos.data[1]).toBeUndefined()
    })
  })

  describe('findById', () => {
    let findById: any
    let item: RepoDoc
    let id: string

    beforeEach(async () => {
      await clearDatabase(mongoOrm.connection.collections)
      item = await makeNewRepoItem({ data: 'any' })
      findById = jest.spyOn(sut.repo, 'findById')
      id = new mongoose.Types.ObjectId().toHexString()
      sut = await MongoDbRepository.init('@/tests/infra/mongodb/mocks', 'repo')
    })

    it('should call repo.findById with correct params', async () => {
      jest.spyOn(sut.repo, 'findById').mockResolvedValueOnce(item)

      await sut.findById(id)

      expect(findById).toHaveBeenCalledWith(id)
      expect(findById).toHaveBeenCalledTimes(1)
    })

    it('should throw NotFoundError if repo.findById returns null', async () => {
      jest.spyOn(sut.repo, 'findById').mockResolvedValueOnce(null as any)

      const response = sut.findById(id)

      await expect(response).rejects.toThrow(new NotFoundError())
    })

    it('should rethrow if mongoose.findById throws', async () => {
      jest.spyOn(sut.repo, 'findById').mockImplementationOnce(() => { throw new Error('mongoose_error') })

      const promise = sut.findById(id)

      await expect(promise).rejects.toThrow(new Error('mongoose_error'))
    })

    it('should return an item', async () => {
      const item = await makeNewRepoItem({ data: 'any' })

      const itemResult = await sut.findById(item._id.toString())

      expect(itemResult.id).toBe(item._id.toString())
    })
  })

  describe('findByIdAndUpdate', () => {
    let findByIdAndUpdate: any
    let id: string

    beforeEach(async () => {
      await clearDatabase(mongoOrm.connection.collections)
      findByIdAndUpdate = jest.spyOn(sut.repo, 'findByIdAndUpdate')
      id = new mongoose.Types.ObjectId().toHexString()
      sut = await MongoDbRepository.init('@/tests/infra/mongodb/mocks', 'repo')
    })

    it('should call repo.findByIdAndUpdate with correct params', async () => {
      const item = await makeNewRepoItem({ data: 'any' })
      jest.spyOn(sut.repo, 'findByIdAndUpdate').mockResolvedValueOnce(item)

      await sut.findByIdAndUpdate(id, { data: 'new_data' })

      expect(findByIdAndUpdate).toHaveBeenCalledWith(id, { data: 'new_data' }, { returnOriginal: false })
      expect(findByIdAndUpdate).toHaveBeenCalledTimes(1)
    })

    it('should throw NotFoundError if repo.findByIdAndUpdate returns null', async () => {
      jest.spyOn(sut.repo, 'findByIdAndUpdate').mockResolvedValueOnce(null as any)

      const response = sut.findByIdAndUpdate(id, { data: 'new_data' })

      await expect(response).rejects.toThrow(new NotFoundError())
    })

    it('should rethrow if mongoose.findByIdAndUpdate throws', async () => {
      jest.spyOn(sut.repo, 'findByIdAndUpdate').mockImplementationOnce(() => { throw new Error('mongoose_error') })

      const promise = sut.findByIdAndUpdate(id, { data: 'new_data' })

      await expect(promise).rejects.toThrow(new Error('mongoose_error'))
    })

    it('should return an updated item', async () => {
      jest.spyOn(sut.repo, 'findByIdAndUpdate').mockClear()
      const item = await makeNewRepoItem({ data: 'any' })

      const itemResult = await sut.findByIdAndUpdate(item._id.toHexString(), { data: 'updated_data' })
      const updatedDoc = await Repo.findOne({ data: 'updated_data' }) as RepoDoc

      expect(itemResult.id).toBe(item._id.toString())
      expect(itemResult.data).toBe('updated_data')
      expect(itemResult.id).toBe(updatedDoc._id.toString())
    })
  })

  describe('findByIdAndDelete', () => {
    let findByIdAndDelete: any
    let id: string

    beforeEach(async () => {
      await clearDatabase(mongoOrm.connection.collections)
      findByIdAndDelete = jest.spyOn(sut.repo, 'findByIdAndDelete')
      id = new mongoose.Types.ObjectId().toHexString()
      sut = await MongoDbRepository.init('@/tests/infra/mongodb/mocks', 'repo')
    })

    it('should call repo.findByIdAndDelete with correct params', async () => {
      const item = await makeNewRepoItem({ data: 'any' })
      jest.spyOn(sut.repo, 'findByIdAndDelete').mockResolvedValueOnce(item)

      await sut.findByIdAndDelete(id)

      expect(findByIdAndDelete).toHaveBeenCalledWith(id)
      expect(findByIdAndDelete).toHaveBeenCalledTimes(1)
    })

    it('should throw NotFoundError if repo.findByIdAndDelete returns null', async () => {
      jest.spyOn(sut.repo, 'findByIdAndDelete').mockResolvedValueOnce(null as any)

      const response = sut.findByIdAndDelete(id)

      await expect(response).rejects.toThrow(new NotFoundError())
    })

    it('should rethrow if mongoose.findByIdAndDelete throws', async () => {
      jest.spyOn(sut.repo, 'findByIdAndDelete').mockImplementationOnce(() => { throw new Error('mongoose_error') })

      const promise = sut.findByIdAndDelete(id)

      await expect(promise).rejects.toThrow(new Error('mongoose_error'))
    })

    it('should return the id of the deleted item', async () => {
      jest.spyOn(sut.repo, 'findByIdAndDelete').mockClear()
      const item = await makeNewRepoItem({ data: 'any' })

      const currentDoc = await Repo.findById(item._id.toHexString())
      const id = await sut.findByIdAndDelete(item._id.toHexString())
      const deletedDoc = await Repo.findById(item._id.toHexString())

      expect(currentDoc).toBeDefined()
      expect(deletedDoc).toBe(null)
      expect(id).toBe(item._id.toHexString())
      expect(id).toBe.toString()
    })
  })
})
