import { FindContactsService } from '@/domain/use-cases'
import { setupFindContacts } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeFindContacts = async (): Promise<FindContactsService> => {
  const contactRepo = await makeMongoDbRepository(MongoDbRepoTypes.contact)
  return setupFindContacts(contactRepo)
}
