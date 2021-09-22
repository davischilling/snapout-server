import { FindEventByIdAndDeleteController } from '@/main/controllers'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

import mongoose from 'mongoose'

describe('FindEventByIdAndDeleteController', () => {
  let id: string
  let findEventByIdAndDeleteService: jest.Mock
  let sut: FindEventByIdAndDeleteController

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    findEventByIdAndDeleteService = jest.fn()
    findEventByIdAndDeleteService.mockResolvedValue({ id })
  })

  beforeEach(() => {
    sut = new FindEventByIdAndDeleteController(findEventByIdAndDeleteService)
  })

  it('should call findEventByIdAndDeleteService with correct params', async () => {
    await sut.handle(id)

    expect(findEventByIdAndDeleteService).toHaveBeenCalledWith(id)
    expect(findEventByIdAndDeleteService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findEventByIdAndDeleteService fails', async () => {
    findEventByIdAndDeleteService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findEventByIdAndDeleteService succeeds', async () => {
    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        id
      }
    })
  })
})
