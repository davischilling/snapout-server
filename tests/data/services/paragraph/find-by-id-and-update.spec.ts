import { FindParagraphByIdAndUpdate, FindParagraphByIdAndUpdateService } from '@/domain/use-cases'
import { Repository as ParagraphDbRepo } from '@/data/contracts/repos'
import { setupFindParagraphByIdAndUpdate } from '@/data/services'
import { Paragraph } from '@/data/entities'

import mongoose from 'mongoose'
import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/paragraph')

describe('FindParagraphByIdAndUpdateService', () => {
  let id: string
  let paragraphUpdateInputs: FindParagraphByIdAndUpdate.Input
  let paragraphAccountRepo: MockProxy<ParagraphDbRepo>
  let mockUpdatedParagraph: Paragraph
  let sut: FindParagraphByIdAndUpdateService

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    paragraphUpdateInputs = {
      id,
      paragraph: 'any_paragraph'
    }
    paragraphAccountRepo = mock()
    paragraphAccountRepo.findById.mockResolvedValue(paragraphUpdateInputs)
    mockUpdatedParagraph = new Paragraph(paragraphUpdateInputs)
  })

  beforeEach(() => {
    sut = setupFindParagraphByIdAndUpdate(paragraphAccountRepo)
  })

  it('should call ParagraphAccountRepo.findById with correct params', async () => {
    await sut(paragraphUpdateInputs)

    expect(paragraphAccountRepo.findById).toHaveBeenCalledWith(id)
    expect(paragraphAccountRepo.findById).toHaveBeenCalledTimes(1)
  })

  it('should call ParagraphAccountRepo.findByIdAndUpdate with correct params', async () => {
    await sut(paragraphUpdateInputs)

    expect(paragraphAccountRepo.findByIdAndUpdate).toHaveBeenCalledWith(id, mockUpdatedParagraph)
    expect(paragraphAccountRepo.findByIdAndUpdate).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if ParagraphAccountRepo.findByIdAndUpdate throws', async () => {
    paragraphAccountRepo.findByIdAndUpdate.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut(paragraphUpdateInputs)

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })

  it('should return an updated paragraph on success', async () => {
    mockUpdatedParagraph.paragraph = 'new_paragraph'
    paragraphAccountRepo.findByIdAndUpdate.mockResolvedValueOnce(mockUpdatedParagraph)

    const paragraphFindByIdResult = await sut(paragraphUpdateInputs)

    expect(paragraphFindByIdResult).toEqual(mockUpdatedParagraph)
  })
})
