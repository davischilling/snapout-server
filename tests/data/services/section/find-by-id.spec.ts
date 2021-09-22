import { SectionData } from '@/domain/models'
import { FindSectionByIdService } from '@/domain/use-cases'
import { Repository as SectionDbRepo } from '@/data/contracts/repos'
import { setupFindSectionById } from '@/data/services'

import mongoose from 'mongoose'
import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/section')

describe('FindSectionByIdService', () => {
  let id: string
  let sectionData: SectionData
  let sectionAccountRepo: MockProxy<SectionDbRepo>
  let sut: FindSectionByIdService

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    sectionData = {
      id,
      menuName: 'any_menuName',
      entityName: 'any_entityName',
      sectionTitle: 'any_sectionTitle'
    }
    sectionAccountRepo = mock()
    sectionAccountRepo.findById.mockResolvedValue(sectionData)
  })

  beforeEach(() => {
    sut = setupFindSectionById(sectionAccountRepo)
  })

  it('should call SectionAccountRepo.findById with correct params', async () => {
    await sut({ id })

    expect(sectionAccountRepo.findById).toHaveBeenCalledWith(id)
    expect(sectionAccountRepo.findById).toHaveBeenCalledTimes(1)
  })

  it('should return an section on success', async () => {
    const sectionFindByIdResult = await sut({ id })

    expect(sectionFindByIdResult).toEqual(sectionData)
  })

  it('should rethrow if SectionAccountRepo.findById throws', async () => {
    sectionAccountRepo.findById.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })
})
