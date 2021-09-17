import { FindUsersService } from '@/domain/use-cases/user'
import { setupFindUsers } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'

export const makeFindUsers = async (): Promise<FindUsersService> => {
  const userRepo = await makeMongoDbRepository('user')
  return setupFindUsers(userRepo)
}
