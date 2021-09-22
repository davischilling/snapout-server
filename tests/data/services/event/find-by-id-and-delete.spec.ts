import { FindEventByIdAndDeleteService } from '@/domain/use-cases'
import { Repository as EventDbRepo } from '@/data/contracts/repos'
import { setupFindEventByIdAndDelete } from '@/data/services'

import mongoose from 'mongoose'
import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/event')

describe('FindEventByIdAndDeleteService', () => {
  let id: string
  let eventAccountRepo: MockProxy<EventDbRepo>
  let sut: FindEventByIdAndDeleteService

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    eventAccountRepo = mock()
    eventAccountRepo.findByIdAndDelete.mockResolvedValue(id)
  })

  beforeEach(() => {
    sut = setupFindEventByIdAndDelete(eventAccountRepo)
  })

  it('should call EventAccountRepo.findByIdAndDelete with correct params', async () => {
    await sut({ id })

    expect(eventAccountRepo.findByIdAndDelete).toHaveBeenCalledWith(id)
    expect(eventAccountRepo.findByIdAndDelete).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if EventAccountRepo.findByIdAndDelete throws', async () => {
    eventAccountRepo.findByIdAndDelete.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })

  it('should return the deleted event id on success', async () => {
    const eventFindByIdResult = await sut({ id })

    expect(eventFindByIdResult).toEqual({ id })
  })
})
