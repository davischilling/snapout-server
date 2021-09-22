import { CreateEventService } from '@/domain/use-cases'
import { setupCreateEvent } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeCreateEvent = async (): Promise<CreateEventService> => {
  const eventRepo = await makeMongoDbRepository(MongoDbRepoTypes.event)
  return setupCreateEvent(eventRepo)
}
