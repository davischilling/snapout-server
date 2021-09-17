export type FindUserByIdAndDeleteService = (params: FindUserByIdAndDelete.Input) => Promise<FindUserByIdAndDelete.Output>

export namespace FindUserByIdAndDelete {
  export type Input = { id: string }
  export type Output = { id: string } | Error
}
