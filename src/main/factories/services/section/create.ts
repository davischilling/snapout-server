import { CreateSectionService } from '@/domain/use-cases'
import { setupCreateSection } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeCreateSection = async (): Promise<CreateSectionService> => {
  const sectionRepo = await makeMongoDbRepository(MongoDbRepoTypes.section)
  return setupCreateSection(sectionRepo)
}
