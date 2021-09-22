import { ParagraphData } from '@/domain/models'

export type FindParagraphByIdAndUpdateService = (params: FindParagraphByIdAndUpdate.Input) => Promise<FindParagraphByIdAndUpdate.Output>

export namespace FindParagraphByIdAndUpdate {
  export type Input = {
    id: string
    paragraph: string
  }
  export type Output = { paragraph: ParagraphData } | Error
}
