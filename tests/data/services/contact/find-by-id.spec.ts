import { ContactData } from '@/domain/models'
import { FindContactByIdService } from '@/domain/use-cases'
import { Repository as ContactDbRepo } from '@/data/contracts/repos'
import { setupFindContactById } from '@/data/services'

import mongoose from 'mongoose'
import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/contact')

describe('FindContactByIdService', () => {
  let id: string
  let contactData: ContactData
  let contactAccountRepo: MockProxy<ContactDbRepo>
  let sut: FindContactByIdService

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    contactData = {
      id,
      message: 'any_message',
      email: 'any_email',
      eventManager: 'any_eventManager',
      phone: 'any_phone'
    }
    contactAccountRepo = mock()
    contactAccountRepo.findById.mockResolvedValue(contactData)
  })

  beforeEach(() => {
    sut = setupFindContactById(contactAccountRepo)
  })

  it('should call ContactAccountRepo.findById with correct params', async () => {
    await sut({ id })

    expect(contactAccountRepo.findById).toHaveBeenCalledWith(id)
    expect(contactAccountRepo.findById).toHaveBeenCalledTimes(1)
  })

  it('should return an contact on success', async () => {
    const contactFindByIdResult = await sut({ id })

    expect(contactFindByIdResult).toEqual(contactData)
  })

  it('should rethrow if ContactAccountRepo.findById throws', async () => {
    contactAccountRepo.findById.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })
})
