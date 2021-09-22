import { UnauthorizedError } from '@/application/errors'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { CreateEvent } from '@/domain/use-cases'
import { CreateEventController } from '@/main/controllers'

describe('CreateEventController', () => {
  let eventData: CreateEvent.Input
  let createEvent: jest.Mock
  let sut: CreateEventController

  beforeAll(() => {
    eventData = {
      weekDay: 'any_weekDay',
      dayMonth: 'any_dayMonth',
      city: 'any_city',
      local: 'any_local'
    }
    createEvent = jest.fn()
    createEvent.mockResolvedValue({ id: 'event_id' })
  })

  beforeEach(() => {
    sut = new CreateEventController(createEvent)
  })

  it('should call createEvent with correct params', async () => {
    await sut.handle(eventData)

    expect(createEvent).toHaveBeenCalledWith(eventData)
    expect(createEvent).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if createEvent fails', async () => {
    createEvent.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(eventData)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 201 if createEvent succeeds', async () => {
    const httpResponse = await sut.handle(eventData)

    expect(httpResponse).toEqual({
      statusCode: 201,
      data: {
        id: 'event_id'
      }
    })
  })
})
