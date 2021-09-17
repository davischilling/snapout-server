import { RecipeData } from '@/domain/models'

export type FindRecipeByIdService = (params: FindRecipeById.Input) => Promise<FindRecipeById.Output>

export namespace FindRecipeById {
  export type Input = { id: string }
  export type Output = { recipe: RecipeData } | Error
}
