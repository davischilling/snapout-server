import { FindUserByIdAndUpdateController } from '@/main/controllers'
import { makeFindUserByIdAndUpdate } from '@/main/factories/services'

export const makeFindUserByIdAndUpdateController = async (): Promise<FindUserByIdAndUpdateController> => {
  const findUserByIdAndUpdateService = await makeFindUserByIdAndUpdate()
  return new FindUserByIdAndUpdateController(findUserByIdAndUpdateService)
}
