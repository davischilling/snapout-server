import { setupGenerateRecoverToken } from '@/data/services'
import { GenerateRecoverTokenService } from '@/domain/use-cases'
import { makeJwtToken, makeMongoDbRepository } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeGenerateRecoverToken = async (): Promise<GenerateRecoverTokenService> => {
  return setupGenerateRecoverToken(
    await makeMongoDbRepository(MongoDbRepoTypes.account),
    makeJwtToken()
  )
}
