import { FindAccountByIdAndUpdateService } from '@/domain/use-cases'
import { setupFindAccountByIdAndUpdate } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeFindAccountByIdAndUpdate = async (): Promise<FindAccountByIdAndUpdateService> => {
  return setupFindAccountByIdAndUpdate(await makeMongoDbRepository(MongoDbRepoTypes.account))
}
