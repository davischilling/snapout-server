import { FindRecipesService } from '@/domain/use-cases/recipe'
import { Repository as RecipeDbRepo } from '@/data/contracts/repos'

type setup = (
  recipeRepo: RecipeDbRepo,
) => FindRecipesService

export const setupFindRecipes: setup = (recipeRepo) => async (params) => {
  return await recipeRepo.find(params)
}
