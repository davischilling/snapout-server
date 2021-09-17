import { Repository as TypeOfMealDbRepo } from '@/data/contracts/repos'
import { FindTypeOfMealByIdService } from '@/domain/use-cases/typeOfMeal'

type setup = (
  typeOfMealRepo: TypeOfMealDbRepo,
) => FindTypeOfMealByIdService

export const setupFindTypeOfMealById: setup = (typeOfMealRepo) => async ({ id }) => {
  return await typeOfMealRepo.findById(id)
}
