import { FindRecipeItemsService } from '@/domain/use-cases/recipeItem'
import { Repository as RecipeItemDbRepo } from '@/data/contracts/repos'

type setup = (
  recipeItemRepo: RecipeItemDbRepo,
) => FindRecipeItemsService

export const setupFindRecipeItems: setup = (recipeItemRepo) => async (params) => {
  return await recipeItemRepo.find(params)
}
