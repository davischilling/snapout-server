import { FindContactByIdAndDeleteService } from '@/domain/use-cases'
import { setupFindContactByIdAndDelete } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeFindContactByIdAndDelete = async (): Promise<FindContactByIdAndDeleteService> => {
  const contactRepo = await makeMongoDbRepository(MongoDbRepoTypes.contact)
  return setupFindContactByIdAndDelete(contactRepo)
}
