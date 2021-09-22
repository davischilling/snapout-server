import { Repository as SectionDbRepo } from '@/data/contracts/repos'
import { Section } from '@/data/entities'
import { CreateSectionService } from '@/domain/use-cases'

type setup = (
  sectionRepo: SectionDbRepo,
) => CreateSectionService

export const setupCreateSection: setup = (sectionRepo) => async (params) => {
  const newSection = new Section(params)
  const id = await sectionRepo.create(newSection)
  return { id }
}
