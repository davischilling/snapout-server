import { FindTypeOfMealsController } from '@/main/controllers'
import { makeFindTypeOfMeals } from '@/main/factories/services'

export const makeFindTypeOfMealsController = async (): Promise<FindTypeOfMealsController> => {
  const findTypeOfMealsService = await makeFindTypeOfMeals()
  return new FindTypeOfMealsController(findTypeOfMealsService)
}
