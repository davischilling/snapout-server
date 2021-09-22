import { CreateContactService } from '@/domain/use-cases'
import { setupCreateContact } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeCreateContact = async (): Promise<CreateContactService> => {
  const contactRepo = await makeMongoDbRepository(MongoDbRepoTypes.contact)
  return setupCreateContact(contactRepo)
}
