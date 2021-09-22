import { ParagraphData } from '@/domain/models'

export type FindParagraphsService = (params: FindParagraphs.Input) => Promise<FindParagraphs.Output>

export namespace FindParagraphs {
  export type Input = {
    paragraph: string
  }
  export type Output = { items: number, data: ParagraphData[] } | Error
}
