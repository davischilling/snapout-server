import { RecipeData } from '@/domain/models'

export type FindRecipeByIdAndUpdateService = (params: FindRecipeByIdAndUpdate.Input) => Promise<FindRecipeByIdAndUpdate.Output>

export namespace FindRecipeByIdAndUpdate {
  export type Input = any
  export type Output = { recipe: RecipeData } | Error
}
