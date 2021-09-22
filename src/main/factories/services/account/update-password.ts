import { UpdateAccountPasswordService } from '@/domain/use-cases'
import { setupUpdateAccountPassword } from '@/data/services'
import { makeMongoDbRepository, makeCryto } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeUpdateAccountPassword = async (): Promise<UpdateAccountPasswordService> => {
  return setupUpdateAccountPassword(await makeMongoDbRepository(MongoDbRepoTypes.account), makeCryto())
}
