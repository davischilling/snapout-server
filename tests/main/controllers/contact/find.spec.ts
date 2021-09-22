import { FindContactsController } from '@/main/controllers'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

describe('FindContactsController', () => {
  let findContactsService: jest.Mock
  let sut: FindContactsController

  beforeAll(() => {
    findContactsService = jest.fn()
    findContactsService.mockResolvedValue({ items: 0, data: [] })
  })

  beforeEach(() => {
    sut = new FindContactsController(findContactsService)
  })

  it('should call findContactsService with correct params', async () => {
    await sut.handle({ data: 'any' })

    expect(findContactsService).toHaveBeenCalledWith({ data: 'any' })
    expect(findContactsService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findContactsService fails', async () => {
    findContactsService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle({ data: 'any' })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findContactsService succeeds', async () => {
    const httpResponse = await sut.handle({ data: 'any' })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { items: 0, data: [] }
    })
  })
})
