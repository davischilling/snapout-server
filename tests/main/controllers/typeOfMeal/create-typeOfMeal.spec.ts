import { UnauthorizedError } from '@/application/errors'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { CreateTypeOfMealController } from '@/main/controllers'

type TypeOfMealInputs = {
  name: string
}

describe('CreateTypeOfMealController', () => {
  let typeOfMealInputs: TypeOfMealInputs
  let createTypeOfMeal: jest.Mock
  let sut: CreateTypeOfMealController

  beforeAll(() => {
    typeOfMealInputs = {
      name: "Mock Meal"
    }
    createTypeOfMeal = jest.fn()
    createTypeOfMeal.mockResolvedValue({ id: 'typeOfMeal_id' })
  })

  beforeEach(() => {
    sut = new CreateTypeOfMealController(createTypeOfMeal)
  })

  it('should call createTypeOfMeal with correct params', async () => {
    await sut.handle(typeOfMealInputs)

    expect(createTypeOfMeal).toHaveBeenCalledWith(typeOfMealInputs)
    expect(createTypeOfMeal).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if createTypeOfMeal fails', async () => {
    createTypeOfMeal.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(typeOfMealInputs)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 201 and typeOfMealID on success', async () => {
    const httpResponse = await sut.handle(typeOfMealInputs)

    expect(httpResponse).toEqual({
      statusCode: 201,
      data: {
        id: 'typeOfMeal_id'
      }
    })
  })
})
