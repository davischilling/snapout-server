import { CreateParagraphService } from '@/domain/use-cases'
import { setupCreateParagraph } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeCreateParagraph = async (): Promise<CreateParagraphService> => {
  const paragraphRepo = await makeMongoDbRepository(MongoDbRepoTypes.paragraph)
  return setupCreateParagraph(paragraphRepo)
}
