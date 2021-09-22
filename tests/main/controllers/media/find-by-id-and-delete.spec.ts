import { FindMediaByIdAndDeleteController } from '@/main/controllers'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

import mongoose from 'mongoose'

describe('FindMediaByIdAndDeleteController', () => {
  let id: string
  let findMediaByIdAndDeleteService: jest.Mock
  let sut: FindMediaByIdAndDeleteController

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    findMediaByIdAndDeleteService = jest.fn()
    findMediaByIdAndDeleteService.mockResolvedValue({ id })
  })

  beforeEach(() => {
    sut = new FindMediaByIdAndDeleteController(findMediaByIdAndDeleteService)
  })

  it('should call findMediaByIdAndDeleteService with correct params', async () => {
    await sut.handle(id)

    expect(findMediaByIdAndDeleteService).toHaveBeenCalledWith(id)
    expect(findMediaByIdAndDeleteService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findMediaByIdAndDeleteService fails', async () => {
    findMediaByIdAndDeleteService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findMediaByIdAndDeleteService succeeds', async () => {
    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        id
      }
    })
  })
})
