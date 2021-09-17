import { RecipeItemData } from '@/domain/models'

export type FindRecipeItemByIdAndUpdateService = (params: FindRecipeItemByIdAndUpdate.Input) => Promise<FindRecipeItemByIdAndUpdate.Output>

export namespace FindRecipeItemByIdAndUpdate {
  export type Input = any
  export type Output = { recipeItem: RecipeItemData } | Error
}
