import { FindSectionByIdAndDeleteService } from '@/domain/use-cases'
import { setupFindSectionByIdAndDelete } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeFindSectionByIdAndDelete = async (): Promise<FindSectionByIdAndDeleteService> => {
  const sectionRepo = await makeMongoDbRepository(MongoDbRepoTypes.section)
  return setupFindSectionByIdAndDelete(sectionRepo)
}
