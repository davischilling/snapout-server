import { FindMediaByIdAndUpdateController } from '@/main/controllers'
import { MediaData } from '@/domain/models'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

import mongoose from 'mongoose'

describe('FindMediaByIdAndUpdateController', () => {
  let id: string
  let mediaData: MediaData
  let findMediaByIdAndUpdateService: jest.Mock
  let sut: FindMediaByIdAndUpdateController

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    mediaData = {
      id,
      youtubeUrlId: 'any_youtubeUrlId',
      videoTitle: 'any_videoTitle'
    }
    findMediaByIdAndUpdateService = jest.fn()
    findMediaByIdAndUpdateService.mockResolvedValue(mediaData)
  })

  beforeEach(() => {
    sut = new FindMediaByIdAndUpdateController(findMediaByIdAndUpdateService)
  })

  it('should call findMediaByIdAndUpdateService with correct params', async () => {
    await sut.handle({ params: { data: 'any_data', id } })

    expect(findMediaByIdAndUpdateService).toHaveBeenCalledWith({ params: { data: 'any_data', id } })
    expect(findMediaByIdAndUpdateService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findMediaByIdAndUpdateService fails', async () => {
    findMediaByIdAndUpdateService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle({ params: { data: 'any_data', id } })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findMediaByIdAndUpdateService succeeds', async () => {
    const httpResponse = await sut.handle({ params: { data: 'any_data', id } })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: mediaData
    })
  })
})
