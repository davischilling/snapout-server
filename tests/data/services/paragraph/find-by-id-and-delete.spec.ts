import { FindParagraphByIdAndDeleteService } from '@/domain/use-cases/paragraph'
import { Repository as ParagraphDbRepo } from '@/data/contracts/repos'
import { setupFindParagraphByIdAndDelete } from '@/data/services'

import mongoose from 'mongoose'
import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/paragraph')

describe('FindParagraphByIdAndDeleteService', () => {
  let id: string
  let paragraphRepo: MockProxy<ParagraphDbRepo>
  let sut: FindParagraphByIdAndDeleteService

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    paragraphRepo = mock()
    paragraphRepo.findByIdAndDelete.mockResolvedValue(id)
  })

  beforeEach(() => {
    sut = setupFindParagraphByIdAndDelete(paragraphRepo)
  })

  it('should call ParagraphRepo.findByIdAndDelete with correct params', async () => {
    await sut({ id })

    expect(paragraphRepo.findByIdAndDelete).toHaveBeenCalledWith(id)
    expect(paragraphRepo.findByIdAndDelete).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if ParagraphRepo.findByIdAndDelete throws', async () => {
    paragraphRepo.findByIdAndDelete.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })

  it('should return the deleted paragraph id on success', async () => {
    const paragraphFindByIdResult = await sut({ id })

    expect(paragraphFindByIdResult).toEqual({ id })
  })
})
