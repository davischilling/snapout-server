import { Paragraph } from '@/data/entities'
import { ParagraphData } from '@/domain/models'

describe('Paragraph', () => {
  let paragraphData: ParagraphData
  let sut: Paragraph

  beforeEach(() => {
    paragraphData = {
      paragraph: 'any_paragraph'
    }
  })

  it('should fill the attrs on the constructor with correct params', () => {
    sut = new Paragraph(paragraphData)

    expect(sut).toEqual(paragraphData)
  })

  it('should update an paragraph correctly', () => {
    sut = new Paragraph(paragraphData)
    sut.id = 'any_paragraph_id'

    const updatedParagraph = new Paragraph({ ...sut, ...{ paragraph: 'new_paragraph' } })

    expect(updatedParagraph).toEqual({
      id: 'any_paragraph_id',
      paragraph: 'new_paragraph'
    })
  })
})
