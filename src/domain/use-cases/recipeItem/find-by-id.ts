import { RecipeItemData } from '@/domain/models'

export type FindRecipeItemByIdService = (params: FindRecipeItemById.Input) => Promise<FindRecipeItemById.Output>

export namespace FindRecipeItemById {
  export type Input = { id: string }
  export type Output = { recipeItem: RecipeItemData } | Error
}
