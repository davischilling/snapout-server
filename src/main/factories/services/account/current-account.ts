import { CurrentAccountService } from '@/domain/use-cases'
import { setupCurrentAccount } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeCurrentAccountService = async (): Promise<CurrentAccountService> => {
  return setupCurrentAccount(
    await makeMongoDbRepository(MongoDbRepoTypes.account)
  )
}
