import { FindTypeOfMealByIdController } from '@/main/controllers'
import { makeFindTypeOfMealById } from '@/main/factories/services'

export const makeFindTypeOfMealByIdController = async (): Promise<FindTypeOfMealByIdController> => {
  const findTypeOfMealByIdService = await makeFindTypeOfMealById()
  return new FindTypeOfMealByIdController(findTypeOfMealByIdService)
}
