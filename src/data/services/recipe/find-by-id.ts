import { FindRecipeByIdService } from '@/domain/use-cases/recipe'
import { Repository as RecipeDbRepo } from '@/data/contracts/repos'

type setup = (
  recipeRepo: RecipeDbRepo,
) => FindRecipeByIdService

export const setupFindRecipeById: setup = (recipeRepo) => async ({ id }) => {
  return await recipeRepo.findById(id)
}
