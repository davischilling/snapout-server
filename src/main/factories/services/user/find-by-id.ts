import { FindUserByIdService } from '@/domain/use-cases/user'
import { setupFindUserById } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'

export const makeFindUserById = async (): Promise<FindUserByIdService> => {
  const userRepo = await makeMongoDbRepository('user')
  return setupFindUserById(userRepo)
}
