import { FindSectionByIdAndDeleteService } from '@/domain/use-cases'
import { Repository as SectionDbRepo } from '@/data/contracts/repos'

type setup = (
  sectionRepo: SectionDbRepo,
) => FindSectionByIdAndDeleteService

export const setupFindSectionByIdAndDelete: setup = (sectionRepo) => async ({ id }) => {
  const deletedSectionId = await sectionRepo.findByIdAndDelete(id)
  return { id: deletedSectionId }
}
