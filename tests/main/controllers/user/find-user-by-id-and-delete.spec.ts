import { FindUserByIdAndDeleteController } from '@/main/controllers'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

import mongoose from 'mongoose'

describe('FindUserByIdAndDeleteController', () => {
  let id: string
  let findUserByIdAndDeleteService: jest.Mock
  let sut: FindUserByIdAndDeleteController

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    findUserByIdAndDeleteService = jest.fn()
    findUserByIdAndDeleteService.mockResolvedValue({ id })
  })

  beforeEach(() => {
    sut = new FindUserByIdAndDeleteController(findUserByIdAndDeleteService)
  })

  it('should call findUserByIdAndDeleteService with correct params', async () => {
    await sut.handle(id)

    expect(findUserByIdAndDeleteService).toHaveBeenCalledWith(id)
    expect(findUserByIdAndDeleteService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findUserByIdAndDeleteService fails', async () => {
    findUserByIdAndDeleteService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findUserByIdAndDeleteService succeeds', async () => {
    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        id
      }
    })
  })
})
