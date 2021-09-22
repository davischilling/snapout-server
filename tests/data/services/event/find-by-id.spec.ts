import { EventData } from '@/domain/models'
import { FindEventByIdService } from '@/domain/use-cases'
import { Repository as EventDbRepo } from '@/data/contracts/repos'
import { setupFindEventById } from '@/data/services'

import mongoose from 'mongoose'
import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/event')

describe('FindEventByIdService', () => {
  let id: string
  let eventData: EventData
  let eventAccountRepo: MockProxy<EventDbRepo>
  let sut: FindEventByIdService

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    eventData = {
      id,
      weekDay: 'any_weekDay',
      dayMonth: 'any_dayMonth',
      city: 'any_city',
      local: 'any_local'
    }
    eventAccountRepo = mock()
    eventAccountRepo.findById.mockResolvedValue(eventData)
  })

  beforeEach(() => {
    sut = setupFindEventById(eventAccountRepo)
  })

  it('should call EventAccountRepo.findById with correct params', async () => {
    await sut({ id })

    expect(eventAccountRepo.findById).toHaveBeenCalledWith(id)
    expect(eventAccountRepo.findById).toHaveBeenCalledTimes(1)
  })

  it('should return an event on success', async () => {
    const eventFindByIdResult = await sut({ id })

    expect(eventFindByIdResult).toEqual(eventData)
  })

  it('should rethrow if EventAccountRepo.findById throws', async () => {
    eventAccountRepo.findById.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })
})
