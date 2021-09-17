import { Repository as TypeOfMealDbRepo } from '@/data/contracts/repos'
import { TypeOfMeal } from '@/data/entities'
import { CreateTypeOfMealService } from '@/domain/use-cases/typeOfMeal'

type setup = (
  typeOfMealRepo: TypeOfMealDbRepo,
) => CreateTypeOfMealService

export const setupCreateTypeOfMeal: setup = (typeOfMealRepo) => async (params) => {
  const newTypeOfMeal = new TypeOfMeal(params)
  const id = await typeOfMealRepo.create(newTypeOfMeal)
  return { id }
}
