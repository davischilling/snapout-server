import { FindEventByIdAndUpdateController } from '@/main/controllers'
import { EventData } from '@/domain/models'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

import mongoose from 'mongoose'

describe('FindEventByIdAndUpdateController', () => {
  let id: string
  let eventData: EventData
  let findEventByIdAndUpdateService: jest.Mock
  let sut: FindEventByIdAndUpdateController

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    eventData = {
      id,
      weekDay: 'any_weekDay',
      dayMonth: 'any_dayMonth',
      city: 'any_city',
      local: 'any_local'
    }
    findEventByIdAndUpdateService = jest.fn()
    findEventByIdAndUpdateService.mockResolvedValue(eventData)
  })

  beforeEach(() => {
    sut = new FindEventByIdAndUpdateController(findEventByIdAndUpdateService)
  })

  it('should call findEventByIdAndUpdateService with correct params', async () => {
    await sut.handle({ params: { data: 'any_data', id } })

    expect(findEventByIdAndUpdateService).toHaveBeenCalledWith({ params: { data: 'any_data', id } })
    expect(findEventByIdAndUpdateService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findEventByIdAndUpdateService fails', async () => {
    findEventByIdAndUpdateService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle({ params: { data: 'any_data', id } })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findEventByIdAndUpdateService succeeds', async () => {
    const httpResponse = await sut.handle({ params: { data: 'any_data', id } })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: eventData
    })
  })
})
