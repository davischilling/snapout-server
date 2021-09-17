export type FindRecipeItemByIdAndDeleteService = (params: FindRecipeItemByIdAndDelete.Input) => Promise<FindRecipeItemByIdAndDelete.Output>

export namespace FindRecipeItemByIdAndDelete {
  export type Input = { id: string }
  export type Output = { id: string } | Error
}
