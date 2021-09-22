import { FindParagraphByIdAndUpdateController } from '@/main/controllers'
import { ParagraphData } from '@/domain/models'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

import mongoose from 'mongoose'

describe('FindParagraphByIdAndUpdateController', () => {
  let id: string
  let paragraphData: ParagraphData
  let findParagraphByIdAndUpdateService: jest.Mock
  let sut: FindParagraphByIdAndUpdateController

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    paragraphData = {
      id,
      paragraph: 'any_paragraph'
    }
    findParagraphByIdAndUpdateService = jest.fn()
    findParagraphByIdAndUpdateService.mockResolvedValue(paragraphData)
  })

  beforeEach(() => {
    sut = new FindParagraphByIdAndUpdateController(findParagraphByIdAndUpdateService)
  })

  it('should call findParagraphByIdAndUpdateService with correct params', async () => {
    await sut.handle({ params: { data: 'any_data', id } })

    expect(findParagraphByIdAndUpdateService).toHaveBeenCalledWith({ params: { data: 'any_data', id } })
    expect(findParagraphByIdAndUpdateService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findParagraphByIdAndUpdateService fails', async () => {
    findParagraphByIdAndUpdateService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle({ params: { data: 'any_data', id } })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findParagraphByIdAndUpdateService succeeds', async () => {
    const httpResponse = await sut.handle({ params: { data: 'any_data', id } })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: paragraphData
    })
  })
})
