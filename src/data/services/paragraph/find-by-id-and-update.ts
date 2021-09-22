import { FindParagraphByIdAndUpdateService } from '@/domain/use-cases'
import { Repository as ParagraphDbRepo } from '@/data/contracts/repos'
import {Paragraph } from '@/data/entities'

type setup = (
 paragraphRepo: ParagraphDbRepo,
) => FindParagraphByIdAndUpdateService

export const setupFindParagraphByIdAndUpdate: setup = (paragraphRepo) => async params => {
  const paragraph: Paragraph = await paragraphRepo.findById(params.id)
  const updatedParagraph = new Paragraph({ ...paragraph, ...params })
  return await paragraphRepo.findByIdAndUpdate(params.id, updatedParagraph)
}
