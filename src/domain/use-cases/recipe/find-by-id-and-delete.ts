export type FindRecipeByIdAndDeleteService = (params: FindRecipeByIdAndDelete.Input) => Promise<FindRecipeByIdAndDelete.Output>

export namespace FindRecipeByIdAndDelete {
  export type Input = { id: string }
  export type Output = { id: string } | Error
}
