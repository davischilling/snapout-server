import { FindUserByIdController } from '@/main/controllers'
import { makeFindUserById } from '@/main/factories/services'

export const makeFindUserByIdController = async (): Promise<FindUserByIdController> => {
  const findUserByIdService = await makeFindUserById()
  return new FindUserByIdController(findUserByIdService)
}
