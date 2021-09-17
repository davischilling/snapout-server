import { RecipeData } from '@/domain/models'

export type FindRecipesService = (params: FindRecipes.Input) => Promise<FindRecipes.Output>

export namespace FindRecipes {
  export type Input = any
  export type Output = { items: number, data: RecipeData[] } | Error
}
