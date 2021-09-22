import { FindEventByIdAndUpdate, FindEventByIdAndUpdateService } from '@/domain/use-cases'
import { Repository as EventDbRepo } from '@/data/contracts/repos'
import { setupFindEventByIdAndUpdate } from '@/data/services'
import { Event } from '@/data/entities'

import mongoose from 'mongoose'
import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/event')

describe('FindEventByIdAndUpdateService', () => {
  let id: string
  let eventUpdateInputs: FindEventByIdAndUpdate.Input
  let eventAccountRepo: MockProxy<EventDbRepo>
  let mockUpdatedEvent: Event
  let sut: FindEventByIdAndUpdateService

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    eventUpdateInputs = {
      id,
      weekDay: 'any_weekDay',
      dayMonth: 'any_dayMonth',
      city: 'any_city',
      local: 'any_local'
    }
    eventAccountRepo = mock()
    eventAccountRepo.findById.mockResolvedValue(eventUpdateInputs)
    mockUpdatedEvent = new Event(eventUpdateInputs)
  })

  beforeEach(() => {
    sut = setupFindEventByIdAndUpdate(eventAccountRepo)
  })

  it('should call EventAccountRepo.findById with correct params', async () => {
    await sut(eventUpdateInputs)

    expect(eventAccountRepo.findById).toHaveBeenCalledWith(id)
    expect(eventAccountRepo.findById).toHaveBeenCalledTimes(1)
  })

  it('should call EventAccountRepo.findByIdAndUpdate with correct params', async () => {
    await sut(eventUpdateInputs)

    expect(eventAccountRepo.findByIdAndUpdate).toHaveBeenCalledWith(id, mockUpdatedEvent)
    expect(eventAccountRepo.findByIdAndUpdate).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if EventAccountRepo.findByIdAndUpdate throws', async () => {
    eventAccountRepo.findByIdAndUpdate.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut(eventUpdateInputs)

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })

  it('should return an updated event on success', async () => {
    mockUpdatedEvent.local = 'new_local'
    eventAccountRepo.findByIdAndUpdate.mockResolvedValueOnce(mockUpdatedEvent)

    const eventFindByIdResult = await sut(eventUpdateInputs)

    expect(eventFindByIdResult).toEqual(mockUpdatedEvent)
  })
})
