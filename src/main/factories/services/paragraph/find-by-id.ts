import { FindParagraphByIdService } from '@/domain/use-cases'
import { setupFindParagraphById } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeFindParagraphById = async (): Promise<FindParagraphByIdService> => {
  const paragraphRepo = await makeMongoDbRepository(MongoDbRepoTypes.paragraph)
  return setupFindParagraphById(paragraphRepo)
}
