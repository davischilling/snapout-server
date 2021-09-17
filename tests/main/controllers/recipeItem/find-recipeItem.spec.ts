import { FindRecipeItemsController } from '@/main/controllers'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

describe('FindRecipeItemsController', () => {
  let findRecipeItemsService: jest.Mock
  let sut: FindRecipeItemsController

  beforeAll(() => {
    findRecipeItemsService = jest.fn()
    findRecipeItemsService.mockResolvedValue({ items: 0, data: [] })
  })

  beforeEach(() => {
    sut = new FindRecipeItemsController(findRecipeItemsService)
  })

  it('should call findRecipeItemsService with correct params', async () => {
    await sut.handle({ data: 'any' })

    expect(findRecipeItemsService).toHaveBeenCalledWith({ data: 'any' })
    expect(findRecipeItemsService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findRecipeItemsService fails', async () => {
    findRecipeItemsService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle({ data: 'any' })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findRecipeItemsService succeeds', async () => {
    const httpResponse = await sut.handle({ data: 'any' })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { items: 0, data: [] }
    })
  })
})
