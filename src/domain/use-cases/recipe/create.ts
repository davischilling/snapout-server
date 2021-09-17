import { RecipeItemData, TypeOfMealData } from '@/domain/models'

export type CreateRecipeService = (params: CreateRecipe.Input) => Promise<CreateRecipe.Output>

export namespace CreateRecipe {
  export type RecipeInputs = {
    products: string[],
    meals: string[]
  }
  export type Input = RecipeInputs
  export type Output = { id: string } | Error
}
