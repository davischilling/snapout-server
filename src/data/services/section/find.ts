import { FindSectionsService } from '@/domain/use-cases'
import { Repository as SectionDbRepo } from '@/data/contracts/repos'

type setup = (
  sectionRepo: SectionDbRepo,
) => FindSectionsService

export const setupFindSections: setup = (sectionRepo) => async (params) => {
  return await sectionRepo.find(params)
}
