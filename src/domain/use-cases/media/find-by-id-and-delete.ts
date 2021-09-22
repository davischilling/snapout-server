export type FindMediaByIdAndDeleteService = (params: FindMediaByIdAndDelete.Input) => Promise<FindMediaByIdAndDelete.Output>

export namespace FindMediaByIdAndDelete {
  export type Input = { id: string }
  export type Output = { id: string } | Error
}
