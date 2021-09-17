import { FindRecipeByIdAndDeleteController } from '@/main/controllers'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

import mongoose from 'mongoose'

describe('FindRecipeByIdAndDeleteController', () => {
  let id: string
  let findRecipeByIdAndDeleteService: jest.Mock
  let sut: FindRecipeByIdAndDeleteController

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    findRecipeByIdAndDeleteService = jest.fn()
    findRecipeByIdAndDeleteService.mockResolvedValue({ id })
  })

  beforeEach(() => {
    sut = new FindRecipeByIdAndDeleteController(findRecipeByIdAndDeleteService)
  })

  it('should call findRecipeByIdAndDeleteService with correct params', async () => {
    await sut.handle(id)

    expect(findRecipeByIdAndDeleteService).toHaveBeenCalledWith(id)
    expect(findRecipeByIdAndDeleteService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findRecipeByIdAndDeleteService fails', async () => {
    findRecipeByIdAndDeleteService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findRecipeByIdAndDeleteService succeeds', async () => {
    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        id
      }
    })
  })
})
