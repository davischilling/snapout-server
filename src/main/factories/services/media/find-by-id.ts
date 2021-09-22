import { FindMediaByIdService } from '@/domain/use-cases'
import { setupFindMediaById } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeFindMediaById = async (): Promise<FindMediaByIdService> => {
  const mediaRepo = await makeMongoDbRepository(MongoDbRepoTypes.media)
  return setupFindMediaById(mediaRepo)
}
