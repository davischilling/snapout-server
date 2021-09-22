import { UnauthorizedError } from '@/application/errors'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { CreateMedia } from '@/domain/use-cases'
import { CreateMediaController } from '@/main/controllers'

describe('CreateMediaController', () => {
  let mediaData: CreateMedia.Input
  let createMedia: jest.Mock
  let sut: CreateMediaController

  beforeAll(() => {
    mediaData = {
      youtubeUrlId: 'any_youtubeUrlId',
      videoTitle: 'any_videoTitle'
    }
    createMedia = jest.fn()
    createMedia.mockResolvedValue({ id: 'media_id' })
  })

  beforeEach(() => {
    sut = new CreateMediaController(createMedia)
  })

  it('should call createMedia with correct params', async () => {
    await sut.handle(mediaData)

    expect(createMedia).toHaveBeenCalledWith(mediaData)
    expect(createMedia).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if createMedia fails', async () => {
    createMedia.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(mediaData)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 201 if createMedia succeeds', async () => {
    const httpResponse = await sut.handle(mediaData)

    expect(httpResponse).toEqual({
      statusCode: 201,
      data: {
        id: 'media_id'
      }
    })
  })
})
