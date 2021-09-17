import { UnauthorizedError } from '@/application/errors'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { TypeOfMealData } from '@/domain/models'
import { FindTypeOfMealByIdController } from '@/main/controllers'
import mongoose from 'mongoose'


describe('FindTypeOfMealByIdController', () => {
  let id: string
  let typeOfMealAccountId: string
  let typeOfMeal: TypeOfMealData
  let findTypeOfMealByIdService: jest.Mock
  let sut: FindTypeOfMealByIdController

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    typeOfMealAccountId = new mongoose.Types.ObjectId().toHexString()
    typeOfMeal = {
      id,
      name: "Mock Meal"
    }
    findTypeOfMealByIdService = jest.fn()
    findTypeOfMealByIdService.mockResolvedValue(typeOfMeal)
  })

  beforeEach(() => {
    sut = new FindTypeOfMealByIdController(findTypeOfMealByIdService)
  })

  it('should call findTypeOfMealByIdService with correct params', async () => {
    await sut.handle(id)

    expect(findTypeOfMealByIdService).toHaveBeenCalledWith(id)
    expect(findTypeOfMealByIdService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findTypeOfMealByIdService fails', async () => {
    findTypeOfMealByIdService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findTypeOfMealByIdService succeeds', async () => {
    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: typeOfMeal
    })
  })
})
