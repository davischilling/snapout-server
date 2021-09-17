import { FindTypeOfMealByIdAndDeleteController } from '@/main/controllers'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

import mongoose from 'mongoose'

describe('FindTypeOfMealByIdAndDeleteController', () => {
  let id: string
  let findTypeOfMealByIdAndDeleteService: jest.Mock
  let sut: FindTypeOfMealByIdAndDeleteController

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    findTypeOfMealByIdAndDeleteService = jest.fn()
    findTypeOfMealByIdAndDeleteService.mockResolvedValue({ id })
  })

  beforeEach(() => {
    sut = new FindTypeOfMealByIdAndDeleteController(findTypeOfMealByIdAndDeleteService)
  })

  it('should call findTypeOfMealByIdAndDeleteService with correct params', async () => {
    await sut.handle(id)

    expect(findTypeOfMealByIdAndDeleteService).toHaveBeenCalledWith(id)
    expect(findTypeOfMealByIdAndDeleteService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findTypeOfMealByIdAndDeleteService fails', async () => {
    findTypeOfMealByIdAndDeleteService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findTypeOfMealByIdAndDeleteService succeeds', async () => {
    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        id
      }
    })
  })
})
