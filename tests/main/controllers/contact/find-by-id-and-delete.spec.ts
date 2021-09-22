import { FindContactByIdAndDeleteController } from '@/main/controllers'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

import mongoose from 'mongoose'

describe('FindContactByIdAndDeleteController', () => {
  let id: string
  let findContactByIdAndDeleteService: jest.Mock
  let sut: FindContactByIdAndDeleteController

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    findContactByIdAndDeleteService = jest.fn()
    findContactByIdAndDeleteService.mockResolvedValue({ id })
  })

  beforeEach(() => {
    sut = new FindContactByIdAndDeleteController(findContactByIdAndDeleteService)
  })

  it('should call findContactByIdAndDeleteService with correct params', async () => {
    await sut.handle(id)

    expect(findContactByIdAndDeleteService).toHaveBeenCalledWith(id)
    expect(findContactByIdAndDeleteService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findContactByIdAndDeleteService fails', async () => {
    findContactByIdAndDeleteService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findContactByIdAndDeleteService succeeds', async () => {
    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        id
      }
    })
  })
})
