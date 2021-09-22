import { FindEventByIdService } from '@/domain/use-cases'
import { setupFindEventById } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeFindEventById = async (): Promise<FindEventByIdService> => {
  const eventRepo = await makeMongoDbRepository(MongoDbRepoTypes.event)
  return setupFindEventById(eventRepo)
}
