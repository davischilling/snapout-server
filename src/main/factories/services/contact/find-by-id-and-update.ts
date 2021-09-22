import { FindContactByIdAndUpdateService } from '@/domain/use-cases'
import { setupFindContactByIdAndUpdate } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeFindContactByIdAndUpdate = async (): Promise<FindContactByIdAndUpdateService> => {
  const contactRepo = await makeMongoDbRepository(MongoDbRepoTypes.contact)
  return setupFindContactByIdAndUpdate(contactRepo)
}
