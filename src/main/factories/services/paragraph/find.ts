import { FindParagraphsService } from '@/domain/use-cases'
import { setupFindParagraphs } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeFindParagraphs = async (): Promise<FindParagraphsService> => {
  const paragraphRepo = await makeMongoDbRepository(MongoDbRepoTypes.paragraph)
  return setupFindParagraphs(paragraphRepo)
}
