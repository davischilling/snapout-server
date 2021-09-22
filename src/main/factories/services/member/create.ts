import { CreateMemberService } from '@/domain/use-cases'
import { setupCreateMember } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'

export const makeCreateMember = async (): Promise<CreateMemberService> => {
  const memberRepo = await makeMongoDbRepository(MongoDbRepoTypes.member)
  return setupCreateMember(memberRepo)
}
