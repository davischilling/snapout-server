export type FindSectionByIdAndDeleteService = (params: FindSectionByIdAndDelete.Input) => Promise<FindSectionByIdAndDelete.Output>

export namespace FindSectionByIdAndDelete {
  export type Input = { id: string }
  export type Output = { id: string } | Error
}
