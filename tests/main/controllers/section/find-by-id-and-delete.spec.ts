import { FindSectionByIdAndDeleteController } from '@/main/controllers'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

import mongoose from 'mongoose'

describe('FindSectionByIdAndDeleteController', () => {
  let id: string
  let findSectionByIdAndDeleteService: jest.Mock
  let sut: FindSectionByIdAndDeleteController

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    findSectionByIdAndDeleteService = jest.fn()
    findSectionByIdAndDeleteService.mockResolvedValue({ id })
  })

  beforeEach(() => {
    sut = new FindSectionByIdAndDeleteController(findSectionByIdAndDeleteService)
  })

  it('should call findSectionByIdAndDeleteService with correct params', async () => {
    await sut.handle(id)

    expect(findSectionByIdAndDeleteService).toHaveBeenCalledWith(id)
    expect(findSectionByIdAndDeleteService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findSectionByIdAndDeleteService fails', async () => {
    findSectionByIdAndDeleteService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findSectionByIdAndDeleteService succeeds', async () => {
    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        id
      }
    })
  })
})
