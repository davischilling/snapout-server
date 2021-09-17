import { FindProductByIdAndDeleteController } from '@/main/controllers'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

import mongoose from 'mongoose'

describe('FindProductByIdAndDeleteController', () => {
  let id: string
  let findProductByIdAndDeleteService: jest.Mock
  let sut: FindProductByIdAndDeleteController

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    findProductByIdAndDeleteService = jest.fn()
    findProductByIdAndDeleteService.mockResolvedValue({ id })
  })

  beforeEach(() => {
    sut = new FindProductByIdAndDeleteController(findProductByIdAndDeleteService)
  })

  it('should call findProductByIdAndDeleteService with correct params', async () => {
    await sut.handle(id)

    expect(findProductByIdAndDeleteService).toHaveBeenCalledWith(id)
    expect(findProductByIdAndDeleteService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findProductByIdAndDeleteService fails', async () => {
    findProductByIdAndDeleteService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findProductByIdAndDeleteService succeeds', async () => {
    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        id
      }
    })
  })
})
