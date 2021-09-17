import { FindUserByIdAndUpdateService } from '@/domain/use-cases/user'
import { setupFindUserByIdAndUpdate } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'

export const makeFindUserByIdAndUpdate = async (): Promise<FindUserByIdAndUpdateService> => {
  const userRepo = await makeMongoDbRepository('user')
  return setupFindUserByIdAndUpdate(userRepo)
}
