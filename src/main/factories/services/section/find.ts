import { FindSectionsService } from '@/domain/use-cases'
import { setupFindSections } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeFindSections = async (): Promise<FindSectionsService> => {
  const sectionRepo = await makeMongoDbRepository(MongoDbRepoTypes.section)
  return setupFindSections(sectionRepo)
}
