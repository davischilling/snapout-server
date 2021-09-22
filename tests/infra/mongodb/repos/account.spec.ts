import { Account } from '@/data/entities'
import { AccountData } from '@/domain/models'
import { AccountAttrs, AccountEntity as AccountRepoModel } from '@/infra/mongodb/entities'
import { MongoDbRepository } from '@/infra/mongodb/repos'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'
import { clearDatabase, closeDatabase, connect } from '@/tests/infra/mongodb/mocks'

import MongoMemoryServer from 'mongodb-memory-server-core'
import { Mongoose } from 'mongoose'

const makeNewAccount = async (account: AccountData): Promise<string> => {
  const accountAttrs: AccountAttrs = new Account(account)
  const newAccount = AccountRepoModel.build(accountAttrs)
  const saved = await newAccount.save()
  return saved._id.toString()
}

describe('MongoDbRepository', () => {
  let mongoServer: MongoMemoryServer
  let mongoOrm: Mongoose
  let accountData: AccountData
  let account: Account
  let sut: MongoDbRepository

  beforeAll(async () => {
    accountData = {
      email: 'any_email'
    }
    account = new Account(accountData)
    const db = await connect()
    mongoServer = db.mongoServer
    mongoOrm = db.mongoOrm
  })

  afterAll(async () => {
    await closeDatabase({ mongoServer, mongoOrm })
  })

  beforeEach(async () => {
    await clearDatabase(mongoOrm.connection.collections)
    sut = await MongoDbRepository.init('@/infra/mongodb/entities', MongoDbRepoTypes.account)
  })

  describe('create', () => {
    it('should create an account and return an id', async () => {
      const id = await sut.create(account)

      const createdAccount = await AccountRepoModel.findById({ _id: id })

      expect(createdAccount).toBeDefined()
    })
  })

  describe('find', () => {
    it('should return a list of accounts', async () => {
      const idAccount1 = await makeNewAccount(account)
      const idAccountt2 = await makeNewAccount(account)

      const accounts = await sut.find({})

      expect(accounts.items).toBe(2)
      expect(accounts.data[0].id).toBe(idAccount1)
      expect(accounts.data[1].id).toBe(idAccountt2)
    })
  })

  describe('findById', () => {
    it('should return an account', async () => {
      const accountId = await makeNewAccount(account)

      const accountFound = await sut.findById(accountId)

      expect(accountFound.id).toBe(accountId)
    })
  })

  describe('findByIdAndUpdate', () => {
    it('should findById and update an account', async () => {
      const accountId = await makeNewAccount(account)

      const accountFound = await sut.findByIdAndUpdate(accountId, { name: 'new_name' })

      expect(accountFound.name).toBe('new_name')
    })
  })

  describe('findByIdAndDelete', () => {
    it('should findById and delete an account', async () => {
      const accountId = await makeNewAccount(account)
      const accountsFind1 = await sut.find({})

      const accountDeletedId = await sut.findByIdAndDelete(accountId)
      const accountsFind2 = await sut.find({})

      expect(accountId).toBe(accountDeletedId)
      expect(accountsFind1.items).toBe(1)
      expect(accountsFind2.items).toBe(0)
    })
  })
})
