import { FindContactByIdAndUpdateController } from '@/main/controllers'
import { ContactData } from '@/domain/models'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

import mongoose from 'mongoose'

describe('FindContactByIdAndUpdateController', () => {
  let id: string
  let contactData: ContactData
  let findContactByIdAndUpdateService: jest.Mock
  let sut: FindContactByIdAndUpdateController

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    contactData = {
      id,
      message: 'any_message',
      email: 'any_email',
      eventManager: 'any_eventManager',
      phone: 'any_phone'
    }
    findContactByIdAndUpdateService = jest.fn()
    findContactByIdAndUpdateService.mockResolvedValue(contactData)
  })

  beforeEach(() => {
    sut = new FindContactByIdAndUpdateController(findContactByIdAndUpdateService)
  })

  it('should call findContactByIdAndUpdateService with correct params', async () => {
    await sut.handle({ params: { data: 'any_data', id } })

    expect(findContactByIdAndUpdateService).toHaveBeenCalledWith({ params: { data: 'any_data', id } })
    expect(findContactByIdAndUpdateService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findContactByIdAndUpdateService fails', async () => {
    findContactByIdAndUpdateService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle({ params: { data: 'any_data', id } })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findContactByIdAndUpdateService succeeds', async () => {
    const httpResponse = await sut.handle({ params: { data: 'any_data', id } })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: contactData
    })
  })
})
