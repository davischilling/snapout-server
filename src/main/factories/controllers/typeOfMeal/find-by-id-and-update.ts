import { FindTypeOfMealByIdAndUpdateController } from '@/main/controllers'
import { makeFindTypeOfMealByIdAndUpdate } from '@/main/factories/services'

export const makeFindTypeOfMealByIdAndUpdateController = async (): Promise<FindTypeOfMealByIdAndUpdateController> => {
  const findTypeOfMealByIdAndUpdateService = await makeFindTypeOfMealByIdAndUpdate()
  return new FindTypeOfMealByIdAndUpdateController(findTypeOfMealByIdAndUpdateService)
}
