import { FindParagraphs, FindParagraphsService } from '@/domain/use-cases'
import { Repository as ParagraphDbRepo } from '@/data/contracts/repos'
import { setupFindParagraphs } from '@/data/services'

import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/paragraph')

describe('FindParagraphsService', () => {
  let paragraphFindInputs: FindParagraphs.Input
  let paragraphAccountRepo: MockProxy<ParagraphDbRepo>
  let sut: FindParagraphsService

  beforeAll(() => {
    paragraphFindInputs = {
      paragraph: 'any_paragraph'
    }
    paragraphAccountRepo = mock()
    paragraphAccountRepo.find.mockResolvedValue({ items: 0, data: [] })
  })

  beforeEach(() => {
    sut = setupFindParagraphs(paragraphAccountRepo)
  })

  it('should call ParagraphAccountRepo.find with correct params', async () => {
    await sut(paragraphFindInputs)

    expect(paragraphAccountRepo.find).toHaveBeenCalledWith(paragraphFindInputs)
    expect(paragraphAccountRepo.find).toHaveBeenCalledTimes(1)
  })

  it('should return an object with items and data properties on success', async () => {
    const paragraphFindResult = await sut(paragraphFindInputs)

    expect(paragraphFindResult).toEqual({ items: 0, data: [] })
  })

  it('should rethrow if ParagraphAccountRepo.find throws', async () => {
    paragraphAccountRepo.find.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut(paragraphFindInputs)

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })
})
