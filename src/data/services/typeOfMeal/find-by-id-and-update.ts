import { Repository as TypeOfMealDbRepo } from '@/data/contracts/repos'
import { TypeOfMeal } from '@/data/entities'
import { FindTypeOfMealByIdAndUpdateService } from '@/domain/use-cases/typeOfMeal'

type setup = (
  typeOfMealRepo: TypeOfMealDbRepo,
) => FindTypeOfMealByIdAndUpdateService

export const setupFindTypeOfMealByIdAndUpdate: setup = (typeOfMealRepo) => async params => {
  const typeOfMeal: TypeOfMeal = await typeOfMealRepo.findById(params.id)
  const updatedTypeOfMeal = TypeOfMeal.update(typeOfMeal, params)
  return await typeOfMealRepo.findByIdAndUpdate(params.id, updatedTypeOfMeal)
}
