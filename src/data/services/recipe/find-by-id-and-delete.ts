import { FindRecipeByIdAndDeleteService } from '@/domain/use-cases/recipe'
import { Repository as RecipeDbRepo } from '@/data/contracts/repos'

type setup = (
  recipeRepo: RecipeDbRepo,
) => FindRecipeByIdAndDeleteService

export const setupFindRecipeByIdAndDelete: setup = (recipeRepo) => async ({ id }) => {
  const deletedRecipeId = await recipeRepo.findByIdAndDelete(id)
  return { id: deletedRecipeId }
}
