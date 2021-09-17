import { Repository as RecipeDbRepo } from '@/data/contracts/repos'
import { Recipe } from '@/data/entities'
import { CreateRecipeService } from '@/domain/use-cases/recipe'

type setup = (
  recipeRepo: RecipeDbRepo,
) => CreateRecipeService

export const setupCreateRecipe: setup = (recipeRepo) => async (params) => {
  const newRecipe = new Recipe(params)
  const id = await recipeRepo.create(newRecipe)
  return { id }
}
