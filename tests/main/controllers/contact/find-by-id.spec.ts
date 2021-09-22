import { FindContactByIdController } from '@/main/controllers'
import { ContactData } from '@/domain/models'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

import mongoose from 'mongoose'

describe('FindContactByIdController', () => {
  let id: string
  let contactData: ContactData
  let findContactByIdService: jest.Mock
  let sut: FindContactByIdController

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    contactData = {
      id,
      message: 'any_message',
      email: 'any_email',
      eventManager: 'any_eventManager',
      phone: 'any_phone'
    }
    findContactByIdService = jest.fn()
    findContactByIdService.mockResolvedValue(contactData)
  })

  beforeEach(() => {
    sut = new FindContactByIdController(findContactByIdService)
  })

  it('should call findContactByIdService with correct params', async () => {
    await sut.handle(id)

    expect(findContactByIdService).toHaveBeenCalledWith(id)
    expect(findContactByIdService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findContactByIdService fails', async () => {
    findContactByIdService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findContactByIdService succeeds', async () => {
    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: contactData
    })
  })
})
