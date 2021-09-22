import { FindMediaByIdController } from '@/main/controllers'
import { MediaData } from '@/domain/models'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

import mongoose from 'mongoose'

describe('FindMediaByIdController', () => {
  let id: string
  let mediaData: MediaData
  let findMediaByIdService: jest.Mock
  let sut: FindMediaByIdController

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    mediaData = {
      id,
      youtubeUrlId: 'any_youtubeUrlId',
      videoTitle: 'any_videoTitle'
    }
    findMediaByIdService = jest.fn()
    findMediaByIdService.mockResolvedValue(mediaData)
  })

  beforeEach(() => {
    sut = new FindMediaByIdController(findMediaByIdService)
  })

  it('should call findMediaByIdService with correct params', async () => {
    await sut.handle(id)

    expect(findMediaByIdService).toHaveBeenCalledWith(id)
    expect(findMediaByIdService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findMediaByIdService fails', async () => {
    findMediaByIdService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findMediaByIdService succeeds', async () => {
    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: mediaData
    })
  })
})
