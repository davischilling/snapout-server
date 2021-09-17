import { FindTypeOfMealByIdAndDeleteController } from '@/main/controllers'
import { makeFindTypeOfMealByIdAndDelete } from '@/main/factories/services'

export const makeFindTypeOfMealByIdAndDeleteController = async (): Promise<FindTypeOfMealByIdAndDeleteController> => {
  const findTypeOfMealByIdAndDeleteService = await makeFindTypeOfMealByIdAndDelete()
  return new FindTypeOfMealByIdAndDeleteController(findTypeOfMealByIdAndDeleteService)
}
