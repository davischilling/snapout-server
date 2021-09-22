export type FindEventByIdAndDeleteService = (params: FindEventByIdAndDelete.Input) => Promise<FindEventByIdAndDelete.Output>

export namespace FindEventByIdAndDelete {
  export type Input = { id: string }
  export type Output = { id: string } | Error
}
