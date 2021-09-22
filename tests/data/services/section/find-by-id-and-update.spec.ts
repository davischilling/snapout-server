import { FindSectionByIdAndUpdate, FindSectionByIdAndUpdateService } from '@/domain/use-cases'
import { Repository as SectionDbRepo } from '@/data/contracts/repos'
import { setupFindSectionByIdAndUpdate } from '@/data/services'
import { Section } from '@/data/entities'

import mongoose from 'mongoose'
import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/section')

describe('FindSectionByIdAndUpdateService', () => {
  let id: string
  let sectionUpdateInputs: FindSectionByIdAndUpdate.Input
  let sectionAccountRepo: MockProxy<SectionDbRepo>
  let mockUpdatedSection: Section
  let sut: FindSectionByIdAndUpdateService

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    sectionUpdateInputs = {
      id,
      menuName: 'any_menuName',
      entityName: 'any_entityName',
      sectionTitle: 'any_sectionTitle'
    }
    sectionAccountRepo = mock()
    sectionAccountRepo.findById.mockResolvedValue(sectionUpdateInputs)
    mockUpdatedSection = new Section(sectionUpdateInputs)
  })

  beforeEach(() => {
    sut = setupFindSectionByIdAndUpdate(sectionAccountRepo)
  })

  it('should call SectionAccountRepo.findById with correct params', async () => {
    await sut(sectionUpdateInputs)

    expect(sectionAccountRepo.findById).toHaveBeenCalledWith(id)
    expect(sectionAccountRepo.findById).toHaveBeenCalledTimes(1)
  })

  it('should call SectionAccountRepo.findByIdAndUpdate with correct params', async () => {
    await sut(sectionUpdateInputs)

    expect(sectionAccountRepo.findByIdAndUpdate).toHaveBeenCalledWith(id, mockUpdatedSection)
    expect(sectionAccountRepo.findByIdAndUpdate).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if SectionAccountRepo.findByIdAndUpdate throws', async () => {
    sectionAccountRepo.findByIdAndUpdate.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut(sectionUpdateInputs)

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })

  it('should return an updated section on success', async () => {
    mockUpdatedSection.sectionTitle = 'new_sectionTitle'
    sectionAccountRepo.findByIdAndUpdate.mockResolvedValueOnce(mockUpdatedSection)

    const sectionFindByIdResult = await sut(sectionUpdateInputs)

    expect(sectionFindByIdResult).toEqual(mockUpdatedSection)
  })
})
