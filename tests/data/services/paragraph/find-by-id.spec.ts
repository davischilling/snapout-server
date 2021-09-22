import { ParagraphData } from '@/domain/models'
import { FindParagraphByIdService } from '@/domain/use-cases'
import { Repository as ParagraphDbRepo } from '@/data/contracts/repos'
import { setupFindParagraphById } from '@/data/services'

import mongoose from 'mongoose'
import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/paragraph')

describe('FindParagraphByIdService', () => {
  let id: string
  let paragraphData: ParagraphData
  let paragraphAccountRepo: MockProxy<ParagraphDbRepo>
  let sut: FindParagraphByIdService

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    paragraphData = {
      id,
      paragraph: 'any_paragraph'
    }
    paragraphAccountRepo = mock()
    paragraphAccountRepo.findById.mockResolvedValue(paragraphData)
  })

  beforeEach(() => {
    sut = setupFindParagraphById(paragraphAccountRepo)
  })

  it('should call ParagraphAccountRepo.findById with correct params', async () => {
    await sut({ id })

    expect(paragraphAccountRepo.findById).toHaveBeenCalledWith(id)
    expect(paragraphAccountRepo.findById).toHaveBeenCalledTimes(1)
  })

  it('should return an paragraph on success', async () => {
    const paragraphFindByIdResult = await sut({ id })

    expect(paragraphFindByIdResult).toEqual(paragraphData)
  })

  it('should rethrow if ParagraphAccountRepo.findById throws', async () => {
    paragraphAccountRepo.findById.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })
})
