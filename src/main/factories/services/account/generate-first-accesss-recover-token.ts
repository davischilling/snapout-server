import { GenerateFirstAccessRecoverTokenService } from '@/domain/use-cases'
import { setupGenerateFirstAccessRecoverToken } from '@/data/services'
import { makeMongoDbRepository, makeJwtToken } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeGenerateFirstAccessRecoverToken = async (): Promise<GenerateFirstAccessRecoverTokenService> => {
  return setupGenerateFirstAccessRecoverToken(
    await makeMongoDbRepository(MongoDbRepoTypes.account),
    makeJwtToken()
  )
}
