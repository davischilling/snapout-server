import { FindEventsService } from '@/domain/use-cases'
import { setupFindEvents } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeFindEvents = async (): Promise<FindEventsService> => {
  const eventRepo = await makeMongoDbRepository(MongoDbRepoTypes.event)
  return setupFindEvents(eventRepo)
}
