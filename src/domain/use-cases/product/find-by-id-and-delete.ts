export type FindProductByIdAndDeleteService = (params: FindProductByIdAndDelete.Input) => Promise<FindProductByIdAndDelete.Output>

export namespace FindProductByIdAndDelete {
  export type Input = { id: string }
  export type Output = { id: string } | Error
}
