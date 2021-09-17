import { CreateUserService } from '@/domain/use-cases/user'
import { setupCreateUser } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'

export const makeCreateUser = async (): Promise<CreateUserService> => {
  const userRepo = await makeMongoDbRepository('user')
  return setupCreateUser(userRepo)
}
