import { FindTypeOfMealsController } from '@/main/controllers'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

describe('FindTypeOfMealsController', () => {
  let findTypeOfMealsService: jest.Mock
  let sut: FindTypeOfMealsController

  beforeAll(() => {
    findTypeOfMealsService = jest.fn()
    findTypeOfMealsService.mockResolvedValue({ items: 0, data: [] })
  })

  beforeEach(() => {
    sut = new FindTypeOfMealsController(findTypeOfMealsService)
  })

  it('should call findTypeOfMealsService with correct params', async () => {
    await sut.handle({ data: 'any' })

    expect(findTypeOfMealsService).toHaveBeenCalledWith({ data: 'any' })
    expect(findTypeOfMealsService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findTypeOfMealsService fails', async () => {
    findTypeOfMealsService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle({ data: 'any' })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findTypeOfMealsService succeeds', async () => {
    const httpResponse = await sut.handle({ data: 'any' })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { items: 0, data: [] }
    })
  })
})
