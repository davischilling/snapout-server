import { FindMemberByIdAndDeleteController } from '@/main/controllers'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

import mongoose from 'mongoose'

describe('FindMemberByIdAndDeleteController', () => {
  let id: string
  let findMemberByIdAndDeleteService: jest.Mock
  let sut: FindMemberByIdAndDeleteController

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    findMemberByIdAndDeleteService = jest.fn()
    findMemberByIdAndDeleteService.mockResolvedValue({ id })
  })

  beforeEach(() => {
    sut = new FindMemberByIdAndDeleteController(findMemberByIdAndDeleteService)
  })

  it('should call findMemberByIdAndDeleteService with correct params', async () => {
    await sut.handle(id)

    expect(findMemberByIdAndDeleteService).toHaveBeenCalledWith(id)
    expect(findMemberByIdAndDeleteService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findMemberByIdAndDeleteService fails', async () => {
    findMemberByIdAndDeleteService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findMemberByIdAndDeleteService succeeds', async () => {
    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        id
      }
    })
  })
})
