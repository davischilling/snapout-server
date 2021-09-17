export type FindTypeOfMealByIdAndDeleteService = (params: FindTypeOfMealByIdAndDelete.Input) => Promise<FindTypeOfMealByIdAndDelete.Output>

export namespace FindTypeOfMealByIdAndDelete {
  export type Input = { id: string }
  export type Output = { id: string } | Error
}
