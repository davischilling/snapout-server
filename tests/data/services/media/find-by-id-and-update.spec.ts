import { FindMediaByIdAndUpdate, FindMediaByIdAndUpdateService } from '@/domain/use-cases'
import { Repository as MediaDbRepo } from '@/data/contracts/repos'
import { setupFindMediaByIdAndUpdate } from '@/data/services'
import { Media } from '@/data/entities'

import mongoose from 'mongoose'
import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/media')

describe('FindMediaByIdAndUpdateService', () => {
  let id: string
  let mediaUpdateInputs: FindMediaByIdAndUpdate.Input
  let mediaAccountRepo: MockProxy<MediaDbRepo>
  let mockUpdatedMedia: Media
  let sut: FindMediaByIdAndUpdateService

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    mediaUpdateInputs = {
      id,
      youtubeUrlId: 'any_youtubeUrlId',
      videoTitle: 'any_videoTitle'
    }
    mediaAccountRepo = mock()
    mediaAccountRepo.findById.mockResolvedValue(mediaUpdateInputs)
    mockUpdatedMedia = new Media(mediaUpdateInputs)
  })

  beforeEach(() => {
    sut = setupFindMediaByIdAndUpdate(mediaAccountRepo)
  })

  it('should call MediaAccountRepo.findById with correct params', async () => {
    await sut(mediaUpdateInputs)

    expect(mediaAccountRepo.findById).toHaveBeenCalledWith(id)
    expect(mediaAccountRepo.findById).toHaveBeenCalledTimes(1)
  })

  it('should call MediaAccountRepo.findByIdAndUpdate with correct params', async () => {
    await sut(mediaUpdateInputs)

    expect(mediaAccountRepo.findByIdAndUpdate).toHaveBeenCalledWith(id, mockUpdatedMedia)
    expect(mediaAccountRepo.findByIdAndUpdate).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if MediaAccountRepo.findByIdAndUpdate throws', async () => {
    mediaAccountRepo.findByIdAndUpdate.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut(mediaUpdateInputs)

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })

  it('should return an updated media on success', async () => {
    mockUpdatedMedia.videoTitle = 'new_videoTitle'
    mediaAccountRepo.findByIdAndUpdate.mockResolvedValueOnce(mockUpdatedMedia)

    const mediaFindByIdResult = await sut(mediaUpdateInputs)

    expect(mediaFindByIdResult).toEqual(mockUpdatedMedia)
  })
})
