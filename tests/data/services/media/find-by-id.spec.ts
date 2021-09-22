import { MediaData } from '@/domain/models'
import { FindMediaByIdService } from '@/domain/use-cases'
import { Repository as MediaDbRepo } from '@/data/contracts/repos'
import { setupFindMediaById } from '@/data/services'

import mongoose from 'mongoose'
import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/media')

describe('FindMediaByIdService', () => {
  let id: string
  let mediaData: MediaData
  let mediaAccountRepo: MockProxy<MediaDbRepo>
  let sut: FindMediaByIdService

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    mediaData = {
      id,
      youtubeUrlId: 'any_youtubeUrlId',
      videoTitle: 'any_videoTitle'
    }
    mediaAccountRepo = mock()
    mediaAccountRepo.findById.mockResolvedValue(mediaData)
  })

  beforeEach(() => {
    sut = setupFindMediaById(mediaAccountRepo)
  })

  it('should call MediaAccountRepo.findById with correct params', async () => {
    await sut({ id })

    expect(mediaAccountRepo.findById).toHaveBeenCalledWith(id)
    expect(mediaAccountRepo.findById).toHaveBeenCalledTimes(1)
  })

  it('should return an media on success', async () => {
    const mediaFindByIdResult = await sut({ id })

    expect(mediaFindByIdResult).toEqual(mediaData)
  })

  it('should rethrow if MediaAccountRepo.findById throws', async () => {
    mediaAccountRepo.findById.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })
})
