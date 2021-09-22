import { FindContactByIdAndUpdate, FindContactByIdAndUpdateService } from '@/domain/use-cases'
import { Repository as ContactDbRepo } from '@/data/contracts/repos'
import { setupFindContactByIdAndUpdate } from '@/data/services'
import { Contact } from '@/data/entities'

import mongoose from 'mongoose'
import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/contact')

describe('FindContactByIdAndUpdateService', () => {
  let id: string
  let contactUpdateInputs: FindContactByIdAndUpdate.Input
  let contactAccountRepo: MockProxy<ContactDbRepo>
  let mockUpdatedContact: Contact
  let sut: FindContactByIdAndUpdateService

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    contactUpdateInputs = {
      id,
      message: 'any_message',
      email: 'any_email',
      eventManager: 'any_eventManager',
      phone: 'any_phone'
    }
    contactAccountRepo = mock()
    contactAccountRepo.findById.mockResolvedValue(contactUpdateInputs)
    mockUpdatedContact = new Contact(contactUpdateInputs)
  })

  beforeEach(() => {
    sut = setupFindContactByIdAndUpdate(contactAccountRepo)
  })

  it('should call ContactAccountRepo.findById with correct params', async () => {
    await sut(contactUpdateInputs)

    expect(contactAccountRepo.findById).toHaveBeenCalledWith(id)
    expect(contactAccountRepo.findById).toHaveBeenCalledTimes(1)
  })

  it('should call ContactAccountRepo.findByIdAndUpdate with correct params', async () => {
    await sut(contactUpdateInputs)

    expect(contactAccountRepo.findByIdAndUpdate).toHaveBeenCalledWith(id, mockUpdatedContact)
    expect(contactAccountRepo.findByIdAndUpdate).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if ContactAccountRepo.findByIdAndUpdate throws', async () => {
    contactAccountRepo.findByIdAndUpdate.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut(contactUpdateInputs)

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })

  it('should return an updated contact on success', async () => {
    mockUpdatedContact.message = 'new_message'
    contactAccountRepo.findByIdAndUpdate.mockResolvedValueOnce(mockUpdatedContact)

    const contactFindByIdResult = await sut(contactUpdateInputs)

    expect(contactFindByIdResult).toEqual(mockUpdatedContact)
  })
})
