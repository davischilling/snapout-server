import { FindUserByIdAndDeleteController } from '@/main/controllers'
import { makeFindUserByIdAndDelete } from '@/main/factories/services'

export const makeFindUserByIdAndDeleteController = async (): Promise<FindUserByIdAndDeleteController> => {
  const findUserByIdAndDeleteService = await makeFindUserByIdAndDelete()
  return new FindUserByIdAndDeleteController(findUserByIdAndDeleteService)
}
