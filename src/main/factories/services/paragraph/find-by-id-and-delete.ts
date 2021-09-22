import { FindParagraphByIdAndDeleteService } from '@/domain/use-cases'
import { setupFindParagraphByIdAndDelete } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeFindParagraphByIdAndDelete = async (): Promise<FindParagraphByIdAndDeleteService> => {
  const paragraphRepo = await makeMongoDbRepository(MongoDbRepoTypes.paragraph)
  return setupFindParagraphByIdAndDelete(paragraphRepo)
}
