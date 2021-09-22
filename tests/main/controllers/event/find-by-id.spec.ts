import { FindEventByIdController } from '@/main/controllers'
import { EventData } from '@/domain/models'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

import mongoose from 'mongoose'

describe('FindEventByIdController', () => {
  let id: string
  let eventData: EventData
  let findEventByIdService: jest.Mock
  let sut: FindEventByIdController

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    eventData = {
      id,
      weekDay: 'any_weekDay',
      dayMonth: 'any_dayMonth',
      city: 'any_city',
      local: 'any_local'
    }
    findEventByIdService = jest.fn()
    findEventByIdService.mockResolvedValue(eventData)
  })

  beforeEach(() => {
    sut = new FindEventByIdController(findEventByIdService)
  })

  it('should call findEventByIdService with correct params', async () => {
    await sut.handle(id)

    expect(findEventByIdService).toHaveBeenCalledWith(id)
    expect(findEventByIdService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findEventByIdService fails', async () => {
    findEventByIdService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findEventByIdService succeeds', async () => {
    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: eventData
    })
  })
})
