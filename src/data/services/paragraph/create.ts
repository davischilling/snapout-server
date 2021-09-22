import { Repository as ParagraphDbRepo } from '@/data/contracts/repos'
import { Paragraph } from '@/data/entities'
import { CreateParagraphService } from '@/domain/use-cases'

type setup = (
  paragraphRepo: ParagraphDbRepo,
) => CreateParagraphService

export const setupCreateParagraph: setup = (paragraphRepo) => async (params) => {
  const newParagraph = new Paragraph(params)
  const id = await paragraphRepo.create(newParagraph)
  return { id }
}
