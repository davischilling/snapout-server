import { FindParagraphByIdAndUpdateService } from '@/domain/use-cases'
import { setupFindParagraphByIdAndUpdate } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeFindParagraphByIdAndUpdate = async (): Promise<FindParagraphByIdAndUpdateService> => {
  const paragraphRepo = await makeMongoDbRepository(MongoDbRepoTypes.paragraph)
  return setupFindParagraphByIdAndUpdate(paragraphRepo)
}
