import { FindRecipeItemByIdService } from '@/domain/use-cases/recipeItem'
import { Repository as RecipeItemDbRepo } from '@/data/contracts/repos'

type setup = (
  recipeItemRepo: RecipeItemDbRepo,
) => FindRecipeItemByIdService

export const setupFindRecipeItemById: setup = (recipeItemRepo) => async ({ id }) => {
  return await recipeItemRepo.findById(id)
}
