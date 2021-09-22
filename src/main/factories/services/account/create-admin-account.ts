import { CreateAdminAccountService } from '@/domain/use-cases'
import { setupCreateAdminAccount } from '@/data/services'
import { makeMongoDbRepository, makeJwtToken } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeCreateAdminAccount = async (): Promise<CreateAdminAccountService> => {
  return setupCreateAdminAccount(
    await makeMongoDbRepository(MongoDbRepoTypes.account),
    makeJwtToken()
  )
}
