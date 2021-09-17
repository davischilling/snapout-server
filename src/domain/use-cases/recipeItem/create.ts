import { ProductData } from '@/domain/models'

export type CreateRecipeItemService = (params: CreateRecipeItem.Input) => Promise<CreateRecipeItem.Output>

export namespace CreateRecipeItem {
  export type RecipeItemInputs = {
    productID: string,
    productYield: number
  }
  export type Input = RecipeItemInputs
  export type Output = { id: string } | Error
}
