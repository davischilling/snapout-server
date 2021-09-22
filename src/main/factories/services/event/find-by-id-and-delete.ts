import { FindEventByIdAndDeleteService } from '@/domain/use-cases'
import { setupFindEventByIdAndDelete } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeFindEventByIdAndDelete = async (): Promise<FindEventByIdAndDeleteService> => {
  const eventRepo = await makeMongoDbRepository(MongoDbRepoTypes.event)
  return setupFindEventByIdAndDelete(eventRepo)
}
