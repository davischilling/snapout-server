import { UnauthorizedError } from '@/application/errors'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { TypeOfMealData } from '@/domain/models'
import { FindTypeOfMealByIdAndUpdateController } from '@/main/controllers'
import mongoose from 'mongoose'


describe('FindTypeOfMealByIdAndUpdateController', () => {
  let id: string
  let typeOfMealAccountId: string
  let typeOfMeal: TypeOfMealData
  let findTypeOfMealByIdAndUpdateService: jest.Mock
  let sut: FindTypeOfMealByIdAndUpdateController

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    typeOfMealAccountId = new mongoose.Types.ObjectId().toHexString()
    typeOfMeal = {
      id,
      name: "Mock Meal"
    }
    findTypeOfMealByIdAndUpdateService = jest.fn()
    findTypeOfMealByIdAndUpdateService.mockResolvedValue(typeOfMeal)
  })

  beforeEach(() => {
    sut = new FindTypeOfMealByIdAndUpdateController(findTypeOfMealByIdAndUpdateService)
  })

  it('should call findTypeOfMealByIdAndUpdateService with correct params', async () => {
    await sut.handle({ params: { data: 'any_data', id } })

    expect(findTypeOfMealByIdAndUpdateService).toHaveBeenCalledWith({ params: { data: 'any_data', id } })
    expect(findTypeOfMealByIdAndUpdateService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findTypeOfMealByIdAndUpdateService fails', async () => {
    findTypeOfMealByIdAndUpdateService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle({ params: { data: 'any_data', id } })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findTypeOfMealByIdAndUpdateService succeeds', async () => {
    const httpResponse = await sut.handle({ params: { data: 'any_data', id } })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: typeOfMeal
    })
  })
})
