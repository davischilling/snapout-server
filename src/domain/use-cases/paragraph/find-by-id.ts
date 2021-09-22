import { ParagraphData } from '@/domain/models'

export type FindParagraphByIdService = (params: FindParagraphById.Input) => Promise<FindParagraphById.Output>

export namespace FindParagraphById {
  export type Input = { id: string }
  export type Output = { paragraph: ParagraphData } | Error
}
