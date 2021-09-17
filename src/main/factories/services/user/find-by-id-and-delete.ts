import { FindUserByIdAndDeleteService } from '@/domain/use-cases/user'
import { setupFindUserByIdAndDelete } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'

export const makeFindUserByIdAndDelete = async (): Promise<FindUserByIdAndDeleteService> => {
  const userRepo = await makeMongoDbRepository('user')
  return setupFindUserByIdAndDelete(userRepo)
}
