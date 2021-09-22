import { FindMemberByIdAndUpdateService } from '@/domain/use-cases'
import { setupFindMemberByIdAndUpdate } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeFindMemberByIdAndUpdate = async (): Promise<FindMemberByIdAndUpdateService> => {
  const memberRepo = await makeMongoDbRepository(MongoDbRepoTypes.member)
  return setupFindMemberByIdAndUpdate(memberRepo)
}
