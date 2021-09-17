import { CreateTypeOfMealController } from '@/main/controllers'
import { makeCreateTypeOfMeal } from '@/main/factories/services'

export const makeCreateTypeOfMealController = async (): Promise<CreateTypeOfMealController> => {
  const createTypeOfMealService = await makeCreateTypeOfMeal()
  return new CreateTypeOfMealController(createTypeOfMealService)
}
