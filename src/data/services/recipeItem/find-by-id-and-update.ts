import { FindRecipeItemByIdAndUpdateService } from '@/domain/use-cases/recipeItem'
import { Repository as RecipeItemDbRepo } from '@/data/contracts/repos'
import { RecipeItem } from '@/data/entities'

type setup = (
  recipeItemRepo: RecipeItemDbRepo,
) => FindRecipeItemByIdAndUpdateService

export const setupFindRecipeItemByIdAndUpdate: setup = (recipeItemRepo) => async params => {
  const recipeItem: RecipeItem = await recipeItemRepo.findById(params.id)
  const updatedRecipeItem = RecipeItem.update(recipeItem, params)
  return await recipeItemRepo.findByIdAndUpdate(params.id, updatedRecipeItem)
}
