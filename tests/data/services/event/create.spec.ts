import { Repository as EventDbRepo } from '@/data/contracts/repos'
import { Event } from '@/data/entities'
import { setupCreateEvent } from '@/data/services'
import { CreateEvent, CreateEventService } from '@/domain/use-cases'
import { mock, MockProxy } from 'jest-mock-extended'
import { mocked } from 'ts-jest/utils'

jest.mock('@/data/entities/event')

describe('CreateEventService', () => {
  let eventAccountRepo: MockProxy<EventDbRepo>
  const createEventInput: CreateEvent.EventInputs = {
    weekDay: 'any_weekDay',
    dayMonth: 'any_dayMonth',
    city: 'any_city',
    local: 'any_local'
  }
  let sut: CreateEventService

  beforeAll(() => {
    eventAccountRepo = mock()
    eventAccountRepo.find.mockResolvedValue({ items: 0, data: [] })
    eventAccountRepo.create.mockResolvedValue('event_id')
  })

  beforeEach(() => {
    sut = setupCreateEvent(eventAccountRepo)
  })

  it('should call EventRepo.create with Event entity', async () => {
    const EventStub = jest.fn().mockImplementation(() => ({ any: 'any' }))
    mocked(Event).mockImplementation(EventStub)

    await sut(createEventInput)

    expect(eventAccountRepo.create).toHaveBeenCalledWith({ any: 'any' })
    expect(eventAccountRepo.create).toHaveBeenCalledTimes(1)
  })

  it('should return an id on success', async () => {
    const eventCreateResult = await sut(createEventInput)

    expect(eventCreateResult).toEqual({ id: 'event_id' })
  })

  it('should rethrow if EventAccountRepo.create throws', async () => {
    eventAccountRepo.create.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut(createEventInput)

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })
})
