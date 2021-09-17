import { FindRecipeByIdAndUpdateService } from '@/domain/use-cases/recipe'
import { Repository as RecipeDbRepo } from '@/data/contracts/repos'
import { Recipe } from '@/data/entities'

type setup = (
  recipeRepo: RecipeDbRepo,
) => FindRecipeByIdAndUpdateService

export const setupFindRecipeByIdAndUpdate: setup = (recipeRepo) => async params => {
  const recipe: Recipe = await recipeRepo.findById(params.id)
  const updatedRecipe = Recipe.update(recipe, params)
  return await recipeRepo.findByIdAndUpdate(params.id, updatedRecipe)
}
