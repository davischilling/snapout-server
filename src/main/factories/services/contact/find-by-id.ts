import { FindContactByIdService } from '@/domain/use-cases'
import { setupFindContactById } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeFindContactById = async (): Promise<FindContactByIdService> => {
  const contactRepo = await makeMongoDbRepository(MongoDbRepoTypes.contact)
  return setupFindContactById(contactRepo)
}
