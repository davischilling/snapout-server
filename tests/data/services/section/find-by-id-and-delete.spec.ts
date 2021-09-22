import { FindSectionByIdAndDeleteService } from '@/domain/use-cases'
import { Repository as SectionDbRepo } from '@/data/contracts/repos'
import { setupFindSectionByIdAndDelete } from '@/data/services'

import mongoose from 'mongoose'
import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/section')

describe('FindSectionByIdAndDeleteService', () => {
  let id: string
  let sectionAccountRepo: MockProxy<SectionDbRepo>
  let sut: FindSectionByIdAndDeleteService

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    sectionAccountRepo = mock()
    sectionAccountRepo.findByIdAndDelete.mockResolvedValue(id)
  })

  beforeEach(() => {
    sut = setupFindSectionByIdAndDelete(sectionAccountRepo)
  })

  it('should call SectionAccountRepo.findByIdAndDelete with correct params', async () => {
    await sut({ id })

    expect(sectionAccountRepo.findByIdAndDelete).toHaveBeenCalledWith(id)
    expect(sectionAccountRepo.findByIdAndDelete).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if SectionAccountRepo.findByIdAndDelete throws', async () => {
    sectionAccountRepo.findByIdAndDelete.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })

  it('should return the deleted section id on success', async () => {
    const sectionFindByIdResult = await sut({ id })

    expect(sectionFindByIdResult).toEqual({ id })
  })
})
