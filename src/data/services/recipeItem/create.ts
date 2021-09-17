import { Repository as RecipeItemDbRepo } from '@/data/contracts/repos'
import { RecipeItem } from '@/data/entities'
import { CreateRecipeItemService } from '@/domain/use-cases/recipeItem'

type setup = (
  recipeItemRepo: RecipeItemDbRepo,
) => CreateRecipeItemService

export const setupCreateRecipeItem: setup = (recipeItemRepo) => async (params) => {
  const newRecipeItem = new RecipeItem(params)
  const id = await recipeItemRepo.create(newRecipeItem)
  return { id }
}
