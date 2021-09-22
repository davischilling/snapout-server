export type CreateParagraphService = (params: CreateParagraph.Input) => Promise<CreateParagraph.Output>

export namespace CreateParagraph {
  export type ParagraphInputs = {
    paragraph: string
  }
  export type Input = ParagraphInputs
  export type Output = { id: string } | Error
}
