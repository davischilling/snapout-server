import { RecoverAccountPasswordService } from '@/domain/use-cases'
import { setupRecoverAccountPassword } from '@/data/services'
import { makeMongoDbRepository, makeJwtToken, makeCryto } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeRecoverAccountPassword = async (): Promise<RecoverAccountPasswordService> => {
  return setupRecoverAccountPassword(
    await makeMongoDbRepository(MongoDbRepoTypes.account),
    makeCryto(),
    makeJwtToken()
  )
}
