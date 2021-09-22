import { FindMediasController } from '@/main/controllers'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

describe('FindMediasController', () => {
  let findMediasService: jest.Mock
  let sut: FindMediasController

  beforeAll(() => {
    findMediasService = jest.fn()
    findMediasService.mockResolvedValue({ items: 0, data: [] })
  })

  beforeEach(() => {
    sut = new FindMediasController(findMediasService)
  })

  it('should call findMediasService with correct params', async () => {
    await sut.handle({ data: 'any' })

    expect(findMediasService).toHaveBeenCalledWith({ data: 'any' })
    expect(findMediasService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findMediasService fails', async () => {
    findMediasService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle({ data: 'any' })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findMediasService succeeds', async () => {
    const httpResponse = await sut.handle({ data: 'any' })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { items: 0, data: [] }
    })
  })
})
