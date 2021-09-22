import { FindMediaByIdAndUpdateService } from '@/domain/use-cases'
import { setupFindMediaByIdAndUpdate } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeFindMediaByIdAndUpdate = async (): Promise<FindMediaByIdAndUpdateService> => {
  const mediaRepo = await makeMongoDbRepository(MongoDbRepoTypes.media)
  return setupFindMediaByIdAndUpdate(mediaRepo)
}
