import { FindParagraphByIdService } from '@/domain/use-cases'
import { Repository as ParagraphDbRepo } from '@/data/contracts/repos'

type setup = (
  paragraphRepo: ParagraphDbRepo,
) => FindParagraphByIdService

export const setupFindParagraphById: setup = (paragraphRepo) => async ({ id }) => {
  return await paragraphRepo.findById(id)
}
