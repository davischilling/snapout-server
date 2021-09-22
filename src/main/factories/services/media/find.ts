import { FindMediasService } from '@/domain/use-cases'
import { setupFindMedias } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeFindMedias = async (): Promise<FindMediasService> => {
  const mediaRepo = await makeMongoDbRepository(MongoDbRepoTypes.media)
  return setupFindMedias(mediaRepo)
}
