import { FindSectionByIdAndUpdateService } from '@/domain/use-cases'
import { Repository as SectionDbRepo } from '@/data/contracts/repos'
import { Section } from '@/data/entities'

type setup = (
  SectionRepo: SectionDbRepo,
) => FindSectionByIdAndUpdateService

export const setupFindSectionByIdAndUpdate: setup = (SectionRepo) => async params => {
  const section: Section = await SectionRepo.findById(params.id)
  const updatedSection = new Section({ ...section, ...params })
  return await SectionRepo.findByIdAndUpdate(params.id, updatedSection)
}
