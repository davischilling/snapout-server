import { FindEvents, FindEventsService } from '@/domain/use-cases'
import { Repository as EventDbRepo } from '@/data/contracts/repos'
import { setupFindEvents } from '@/data/services'

import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/event')

describe('FindEventsService', () => {
  let eventFindInputs: FindEvents.Input
  let eventAccountRepo: MockProxy<EventDbRepo>
  let sut: FindEventsService

  beforeAll(() => {
    eventFindInputs = {
      local: 'any_local'
    }
    eventAccountRepo = mock()
    eventAccountRepo.find.mockResolvedValue({ items: 0, data: [] })
  })

  beforeEach(() => {
    sut = setupFindEvents(eventAccountRepo)
  })

  it('should call EventAccountRepo.find with correct params', async () => {
    await sut(eventFindInputs)

    expect(eventAccountRepo.find).toHaveBeenCalledWith(eventFindInputs)
    expect(eventAccountRepo.find).toHaveBeenCalledTimes(1)
  })

  it('should return an object with items and data properties on success', async () => {
    const eventFindResult = await sut({})

    expect(eventFindResult).toEqual({ items: 0, data: [] })
  })

  it('should rethrow if EventAccountRepo.find throws', async () => {
    eventAccountRepo.find.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({})

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })
})
