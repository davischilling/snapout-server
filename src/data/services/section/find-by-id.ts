import { FindSectionByIdService } from '@/domain/use-cases'
import { Repository as SectionDbRepo } from '@/data/contracts/repos'

type setup = (
  sectionRepo: SectionDbRepo,
) => FindSectionByIdService

export const setupFindSectionById: setup = (sectionRepo) => async ({ id }) => {
  return await sectionRepo.findById(id)
}
