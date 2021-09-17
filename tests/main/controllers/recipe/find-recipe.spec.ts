import { FindRecipesController } from '@/main/controllers'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

describe('FindRecipesController', () => {
  let findRecipesService: jest.Mock
  let sut: FindRecipesController

  beforeAll(() => {
    findRecipesService = jest.fn()
    findRecipesService.mockResolvedValue({ items: 0, data: [] })
  })

  beforeEach(() => {
    sut = new FindRecipesController(findRecipesService)
  })

  it('should call findRecipesService with correct params', async () => {
    await sut.handle({ data: 'any' })

    expect(findRecipesService).toHaveBeenCalledWith({ data: 'any' })
    expect(findRecipesService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findRecipesService fails', async () => {
    findRecipesService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle({ data: 'any' })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findRecipesService succeeds', async () => {
    const httpResponse = await sut.handle({ data: 'any' })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { items: 0, data: [] }
    })
  })
})
