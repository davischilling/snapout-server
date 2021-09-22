import { FindEventByIdAndUpdateService } from '@/domain/use-cases'
import { setupFindEventByIdAndUpdate } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeFindEventByIdAndUpdate = async (): Promise<FindEventByIdAndUpdateService> => {
  const eventRepo = await makeMongoDbRepository(MongoDbRepoTypes.event)
  return setupFindEventByIdAndUpdate(eventRepo)
}
