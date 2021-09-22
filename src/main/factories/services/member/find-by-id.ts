import { FindMemberByIdService } from '@/domain/use-cases'
import { setupFindMemberById } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeFindMemberById = async (): Promise<FindMemberByIdService> => {
  const memberRepo = await makeMongoDbRepository(MongoDbRepoTypes.member)
  return setupFindMemberById(memberRepo)
}
