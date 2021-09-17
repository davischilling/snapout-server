import { FindTypeOfMealByIdAndDeleteService } from '@/domain/use-cases/typeOfMeal'
import { Repository as TypeOfMealDbRepo } from '@/data/contracts/repos'

type setup = (
  typeOfMealRepo: TypeOfMealDbRepo,
) => FindTypeOfMealByIdAndDeleteService

export const setupFindTypeOfMealByIdAndDelete: setup = (typeOfMealRepo) => async ({ id }) => {
  const deletedTypeOfMealId = await typeOfMealRepo.findByIdAndDelete(id)
  return { id: deletedTypeOfMealId }
}
