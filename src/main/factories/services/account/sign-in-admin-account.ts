import { SignInAdminAccountService } from '@/domain/use-cases'
import { setupSignInAdminAccount } from '@/data/services'
import { makeMongoDbRepository, makeJwtToken } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeSignInAdminAccount = async (): Promise<SignInAdminAccountService> => {
  return setupSignInAdminAccount(
    await makeMongoDbRepository(MongoDbRepoTypes.account),
    makeJwtToken()
  )
}
