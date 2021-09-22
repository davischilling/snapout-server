import { FindMemberByIdAndDeleteService } from '@/domain/use-cases'
import { setupFindMemberByIdAndDelete } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeFindMemberByIdAndDelete = async (): Promise<FindMemberByIdAndDeleteService> => {
  const memberRepo = await makeMongoDbRepository(MongoDbRepoTypes.member)
  return setupFindMemberByIdAndDelete(memberRepo)
}
