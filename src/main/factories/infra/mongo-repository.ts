import { MongoDbRepository } from '@/infra/mongodb/repos'

export const makeMongoDbRepository = async (entity: string): Promise<MongoDbRepository> => {
  return await MongoDbRepository.init('@/infra/mongodb/entities', entity)
}
