import { FindProductsController } from '@/main/controllers'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

describe('FindProductsController', () => {
  let findProductsService: jest.Mock
  let sut: FindProductsController

  beforeAll(() => {
    findProductsService = jest.fn()
    findProductsService.mockResolvedValue({ items: 0, data: [] })
  })

  beforeEach(() => {
    sut = new FindProductsController(findProductsService)
  })

  it('should call findProductsService with correct params', async () => {
    await sut.handle({ data: 'any' })

    expect(findProductsService).toHaveBeenCalledWith({ data: 'any' })
    expect(findProductsService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findProductsService fails', async () => {
    findProductsService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle({ data: 'any' })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findProductsService succeeds', async () => {
    const httpResponse = await sut.handle({ data: 'any' })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { items: 0, data: [] }
    })
  })
})
