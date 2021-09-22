import { FindSectionByIdService } from '@/domain/use-cases'
import { setupFindSectionById } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeFindSectionById = async (): Promise<FindSectionByIdService> => {
  const sectionRepo = await makeMongoDbRepository(MongoDbRepoTypes.section)
  return setupFindSectionById(sectionRepo)
}
