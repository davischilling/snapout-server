import { FindParagraphsService } from '@/domain/use-cases'
import { Repository as ParagraphDbRepo } from '@/data/contracts/repos'

type setup = (
  paragraphRepo: ParagraphDbRepo,
) => FindParagraphsService

export const setupFindParagraphs: setup = (paragraphRepo) => async (params) => {
  return await paragraphRepo.find(params)
}
