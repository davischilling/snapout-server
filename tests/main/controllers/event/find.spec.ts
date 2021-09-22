import { FindEventsController } from '@/main/controllers'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

describe('FindEventsController', () => {
  let findEventsService: jest.Mock
  let sut: FindEventsController

  beforeAll(() => {
    findEventsService = jest.fn()
    findEventsService.mockResolvedValue({ items: 0, data: [] })
  })

  beforeEach(() => {
    sut = new FindEventsController(findEventsService)
  })

  it('should call findEventsService with correct params', async () => {
    await sut.handle({ data: 'any' })

    expect(findEventsService).toHaveBeenCalledWith({ data: 'any' })
    expect(findEventsService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findEventsService fails', async () => {
    findEventsService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle({ data: 'any' })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findEventsService succeeds', async () => {
    const httpResponse = await sut.handle({ data: 'any' })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { items: 0, data: [] }
    })
  })
})
