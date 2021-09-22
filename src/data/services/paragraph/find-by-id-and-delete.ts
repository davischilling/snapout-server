import { FindParagraphByIdAndDeleteService } from '@/domain/use-cases'
import { Repository as ParagraphDbRepo } from '@/data/contracts/repos'

type setup = (
  paragraphRepo: ParagraphDbRepo,
) => FindParagraphByIdAndDeleteService

export const setupFindParagraphByIdAndDelete: setup = (paragraphRepo) => async ({ id }) => {
  const deletedParagraphId = await paragraphRepo.findByIdAndDelete(id)
  return { id: deletedParagraphId }
}
