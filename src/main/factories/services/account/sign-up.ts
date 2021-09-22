import { SignUpService } from '@/domain/use-cases'
import { setupSignUp } from '@/data/services'
import { makeMongoDbRepository, makeCryto, makeJwtToken } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeSignUpService = async (): Promise<SignUpService> => {
  return setupSignUp(
    await makeMongoDbRepository(MongoDbRepoTypes.account),
    makeCryto(),
    makeJwtToken()
  )
}
