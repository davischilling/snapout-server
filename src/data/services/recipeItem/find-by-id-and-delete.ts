import { FindRecipeItemByIdAndDeleteService } from '@/domain/use-cases/recipeItem'
import { Repository as RecipeItemDbRepo } from '@/data/contracts/repos'

type setup = (
  recipeItemRepo: RecipeItemDbRepo,
) => FindRecipeItemByIdAndDeleteService

export const setupFindRecipeItemByIdAndDelete: setup = (recipeItemRepo) => async ({ id }) => {
  const deletedRecipeItemId = await recipeItemRepo.findByIdAndDelete(id)
  return { id: deletedRecipeItemId }
}
