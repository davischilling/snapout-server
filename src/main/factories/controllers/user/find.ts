import { FindUsersController } from '@/main/controllers'
import { makeFindUsers } from '@/main/factories/services'

export const makeFindUsersController = async (): Promise<FindUsersController> => {
  const findUsersService = await makeFindUsers()
  return new FindUsersController(findUsersService)
}
