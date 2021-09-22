import { FindSectionByIdAndUpdateService } from '@/domain/use-cases'
import { setupFindSectionByIdAndUpdate } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeFindSectionByIdAndUpdate = async (): Promise<FindSectionByIdAndUpdateService> => {
  const sectionRepo = await makeMongoDbRepository(MongoDbRepoTypes.section)
  return setupFindSectionByIdAndUpdate(sectionRepo)
}
