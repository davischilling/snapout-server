import { FindTypeOfMealsService } from '@/domain/use-cases/typeOfMeal'
import { Repository as TypeOfMealDbRepo } from '@/data/contracts/repos'

type setup = (
  typeOfMealRepo: TypeOfMealDbRepo,
) => FindTypeOfMealsService

export const setupFindTypeOfMeals: setup = (typeOfMealRepo) => async (params) => {
  return await typeOfMealRepo.find(params)
}
