import { SignInService } from '@/domain/use-cases'
import { setupSignIn } from '@/data/services'
import { makeMongoDbRepository, makeCryto, makeJwtToken } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeSignInService = async (): Promise<SignInService> => {
  return setupSignIn(
    await makeMongoDbRepository(MongoDbRepoTypes.account),
    makeCryto(),
    makeJwtToken()
  )
}
