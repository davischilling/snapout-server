import { RecipeItemData } from '@/domain/models'

export type FindRecipeItemsService = (params: FindRecipeItems.Input) => Promise<FindRecipeItems.Output>

export namespace FindRecipeItems {
  export type Input = any
  export type Output = { items: number, data: RecipeItemData[] } | Error
}
