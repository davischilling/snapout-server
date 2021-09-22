export type FindParagraphByIdAndDeleteService = (params: FindParagraphByIdAndDelete.Input) => Promise<FindParagraphByIdAndDelete.Output>

export namespace FindParagraphByIdAndDelete {
  export type Input = { id: string }
  export type Output = { id: string } | Error
}
