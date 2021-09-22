import { CreateMediaService } from '@/domain/use-cases'
import { setupCreateMedia } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeCreateMedia = async (): Promise<CreateMediaService> => {
  const mediaRepo = await makeMongoDbRepository(MongoDbRepoTypes.media)
  return setupCreateMedia(mediaRepo)
}
