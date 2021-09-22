import { ParagraphData } from '@/domain/models'

export class Paragraph {
  id?: string
  paragraph: string

  constructor (
    paragraphData: ParagraphData
  ) {
    const {
      id,
      paragraph
    } = paragraphData
    if (id !== undefined) {
      this.id = id
    }
    this.paragraph = paragraph
  }
}
