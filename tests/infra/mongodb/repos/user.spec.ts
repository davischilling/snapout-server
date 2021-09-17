import { UserEntity as UserRepoModel, UserAttrs } from '@/infra/mongodb/entities'
import { User } from '@/data/entities'
import { GenderType, UserData } from '@/domain/models'
import { MongoDbRepository } from '@/infra/mongodb/repos'
import { clearDatabase, closeDatabase, connect } from '@/tests/infra/mongodb/mocks'

import MongoMemoryServer from 'mongodb-memory-server-core'
import mongoose, { Mongoose } from 'mongoose'

const makeNewUser = async (user: UserData): Promise<string> => {
  const userAttrs: UserAttrs = new User(user)
  const newUser = UserRepoModel.build(userAttrs)
  const saved = await newUser.save()
  return saved._id.toString()
}

describe('MongoDbRepository', () => {
  let mongoServer: MongoMemoryServer
  let mongoOrm: Mongoose
  let userData: UserData
  let user: User
  let sut: MongoDbRepository

  beforeAll(async () => {
    userData = {
      accountId: '5d6ede6a0ba62570afcedd3a',
      gender: GenderType.masculine,
      age: 32,
      height: 173,
      initialWeight: 69,
      physicalActivityLevel: 1.725
    }
    user = new User(userData)
    const db = await connect()
    mongoServer = db.mongoServer
    mongoOrm = db.mongoOrm
  })

  afterAll(async () => {
    await closeDatabase({ mongoServer, mongoOrm })
  })

  beforeEach(async () => {
    await clearDatabase(mongoOrm.connection.collections)
    sut = await MongoDbRepository.init('@/infra/mongodb/entities', 'user')
  })

  describe('create', () => {
    it('should create an user and return an id', async () => {
      const id = await sut.create(user)

      const createdUser = await UserRepoModel.findById({ _id: id })

      expect(createdUser).toBeDefined()
    })
  })

  describe('find', () => {
    it('should return a list of users', async () => {
      const idUser1 = await makeNewUser(user)
      const idUser2 = await makeNewUser(user)

      const users = await sut.find({})

      expect(users.items).toBe(2)
      expect(users.data[0].id).toBe(idUser1)
      expect(users.data[1].id).toBe(idUser2)
    })

    it('should filter users correctly', async () => {
      await makeNewUser(user)
      user.accountId = new mongoose.Types.ObjectId().toHexString()
      await makeNewUser(user)

      const users = await sut.find({ accountId: user.accountId })

      expect(users.items).toBe(1)
      expect(users.data[0]).toBeDefined()
      expect(users.data[1]).toBeUndefined()
    })
  })

  describe('findById', () => {
    it('should return an user', async () => {
      const userId = await makeNewUser(user)

      const userFound = await sut.findById(userId)

      expect(userFound.id).toBe(userId)
    })
  })

  describe('findByIdAndUpdate', () => {
    it('should findById and update an user', async () => {
      const userId = await makeNewUser(user)

      const userFound = await sut.findByIdAndUpdate(userId, { gender: GenderType.feminine })

      expect(userFound.gender).toBe(GenderType.feminine)
    })
  })

  describe('findByIdAndDelete', () => {
    it('should findById and delete an user', async () => {
      const userId = await makeNewUser(user)
      const usersFind1 = await sut.find({})

      const userDeletedId = await sut.findByIdAndDelete(userId)
      const usersFind2 = await sut.find({})

      expect(userId).toBe(userDeletedId)
      expect(usersFind1.items).toBe(1)
      expect(usersFind2.items).toBe(0)
    })
  })
})
