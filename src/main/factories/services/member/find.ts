import { FindMembersService } from '@/domain/use-cases'
import { setupFindMembers } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeFindMembers = async (): Promise<FindMembersService> => {
  const memberRepo = await makeMongoDbRepository(MongoDbRepoTypes.member)
  return setupFindMembers(memberRepo)
}
