import { FindRecipeItemByIdAndDeleteController } from '@/main/controllers'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

import mongoose from 'mongoose'

describe('FindRecipeItemByIdAndDeleteController', () => {
  let id: string
  let findRecipeItemByIdAndDeleteService: jest.Mock
  let sut: FindRecipeItemByIdAndDeleteController

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    findRecipeItemByIdAndDeleteService = jest.fn()
    findRecipeItemByIdAndDeleteService.mockResolvedValue({ id })
  })

  beforeEach(() => {
    sut = new FindRecipeItemByIdAndDeleteController(findRecipeItemByIdAndDeleteService)
  })

  it('should call findRecipeItemByIdAndDeleteService with correct params', async () => {
    await sut.handle(id)

    expect(findRecipeItemByIdAndDeleteService).toHaveBeenCalledWith(id)
    expect(findRecipeItemByIdAndDeleteService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findRecipeItemByIdAndDeleteService fails', async () => {
    findRecipeItemByIdAndDeleteService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findRecipeItemByIdAndDeleteService succeeds', async () => {
    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        id
      }
    })
  })
})
