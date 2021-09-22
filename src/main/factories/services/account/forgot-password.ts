import { ForgotAccountPasswordService } from '@/domain/use-cases'
import { setupForgotAccountPassword } from '@/data/services'
import { makeMongoDbRepository, makeJwtToken } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeForgotAccountPassword = async (): Promise<ForgotAccountPasswordService> => {
  return setupForgotAccountPassword(await makeMongoDbRepository(MongoDbRepoTypes.account), makeJwtToken())
}
