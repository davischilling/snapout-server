import { FindMediaByIdAndDeleteService } from '@/domain/use-cases'
import { setupFindMediaByIdAndDelete } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeFindMediaByIdAndDelete = async (): Promise<FindMediaByIdAndDeleteService> => {
  const mediaRepo = await makeMongoDbRepository(MongoDbRepoTypes.media)
  return setupFindMediaByIdAndDelete(mediaRepo)
}
