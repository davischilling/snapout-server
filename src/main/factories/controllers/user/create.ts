import { CreateUserController } from '@/main/controllers'
import { makeCreateUser } from '@/main/factories/services'

export const makeCreateUserController = async (): Promise<CreateUserController> => {
  const createUserService = await makeCreateUser()
  return new CreateUserController(createUserService)
}
