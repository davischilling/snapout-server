import { FindContactByIdAndDeleteService } from '@/domain/use-cases'
import { Repository as ContactDbRepo } from '@/data/contracts/repos'
import { setupFindContactByIdAndDelete } from '@/data/services'

import mongoose from 'mongoose'
import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/contact')

describe('FindContactByIdAndDeleteService', () => {
  let id: string
  let contactAccountRepo: MockProxy<ContactDbRepo>
  let sut: FindContactByIdAndDeleteService

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    contactAccountRepo = mock()
    contactAccountRepo.findByIdAndDelete.mockResolvedValue(id)
  })

  beforeEach(() => {
    sut = setupFindContactByIdAndDelete(contactAccountRepo)
  })

  it('should call ContactAccountRepo.findByIdAndDelete with correct params', async () => {
    await sut({ id })

    expect(contactAccountRepo.findByIdAndDelete).toHaveBeenCalledWith(id)
    expect(contactAccountRepo.findByIdAndDelete).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if ContactAccountRepo.findByIdAndDelete throws', async () => {
    contactAccountRepo.findByIdAndDelete.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })

  it('should return the deleted contact id on success', async () => {
    const contactFindByIdResult = await sut({ id })

    expect(contactFindByIdResult).toEqual({ id })
  })
})
