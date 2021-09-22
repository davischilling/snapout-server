import { FindParagraphByIdController } from '@/main/controllers'
import { ParagraphData } from '@/domain/models'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

import mongoose from 'mongoose'

describe('FindParagraphByIdController', () => {
  let id: string
  let paragraphData: ParagraphData
  let findParagraphByIdService: jest.Mock
  let sut: FindParagraphByIdController

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    paragraphData = {
      id,
      paragraph: 'any_paragraph'
    }
    findParagraphByIdService = jest.fn()
    findParagraphByIdService.mockResolvedValue(paragraphData)
  })

  beforeEach(() => {
    sut = new FindParagraphByIdController(findParagraphByIdService)
  })

  it('should call findParagraphByIdService with correct params', async () => {
    await sut.handle(id)

    expect(findParagraphByIdService).toHaveBeenCalledWith(id)
    expect(findParagraphByIdService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findParagraphByIdService fails', async () => {
    findParagraphByIdService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findParagraphByIdService succeeds', async () => {
    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: paragraphData
    })
  })
})
