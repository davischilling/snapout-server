import { FindMedias, FindMediasService } from '@/domain/use-cases'
import { Repository as MediaDbRepo } from '@/data/contracts/repos'
import { setupFindMedias } from '@/data/services'

import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/media')

describe('FindMediasService', () => {
  let mediaFindInputs: FindMedias.Input
  let mediaAccountRepo: MockProxy<MediaDbRepo>
  let sut: FindMediasService

  beforeAll(() => {
    mediaFindInputs = {
      videoTitle: 'any_videoTitle'
    }
    mediaAccountRepo = mock()
    mediaAccountRepo.find.mockResolvedValue({ items: 0, data: [] })
  })

  beforeEach(() => {
    sut = setupFindMedias(mediaAccountRepo)
  })

  it('should call MediaAccountRepo.find with correct params', async () => {
    await sut(mediaFindInputs)

    expect(mediaAccountRepo.find).toHaveBeenCalledWith(mediaFindInputs)
    expect(mediaAccountRepo.find).toHaveBeenCalledTimes(1)
  })

  it('should return an object with items and data properties on success', async () => {
    const mediaFindResult = await sut({})

    expect(mediaFindResult).toEqual({ items: 0, data: [] })
  })

  it('should rethrow if MediaAccountRepo.find throws', async () => {
    mediaAccountRepo.find.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({})

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })
})
