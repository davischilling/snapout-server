import { FindParagraphByIdAndDeleteController } from '@/main/controllers'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

import mongoose from 'mongoose'

describe('FindParagraphByIdAndDeleteController', () => {
  let id: string
  let findParagraphByIdAndDeleteService: jest.Mock
  let sut: FindParagraphByIdAndDeleteController

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    findParagraphByIdAndDeleteService = jest.fn()
    findParagraphByIdAndDeleteService.mockResolvedValue({ id })
  })

  beforeEach(() => {
    sut = new FindParagraphByIdAndDeleteController(findParagraphByIdAndDeleteService)
  })

  it('should call findParagraphByIdAndDeleteService with correct params', async () => {
    await sut.handle(id)

    expect(findParagraphByIdAndDeleteService).toHaveBeenCalledWith(id)
    expect(findParagraphByIdAndDeleteService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findParagraphByIdAndDeleteService fails', async () => {
    findParagraphByIdAndDeleteService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findParagraphByIdAndDeleteService succeeds', async () => {
    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        id
      }
    })
  })
})
