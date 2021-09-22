export type FindContactByIdAndDeleteService = (params: FindContactByIdAndDelete.Input) => Promise<FindContactByIdAndDelete.Output>

export namespace FindContactByIdAndDelete {
  export type Input = { id: string }
  export type Output = { id: string } | Error
}
