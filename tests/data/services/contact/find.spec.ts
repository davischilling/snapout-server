import { FindContacts, FindContactsService } from '@/domain/use-cases'
import { Repository as ContactDbRepo } from '@/data/contracts/repos'
import { setupFindContacts } from '@/data/services'

import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/contact')

describe('FindContactsService', () => {
  let contactFindInputs: FindContacts.Input
  let contactAccountRepo: MockProxy<ContactDbRepo>
  let sut: FindContactsService

  beforeAll(() => {
    contactFindInputs = {
      email: 'any_email'
    }
    contactAccountRepo = mock()
    contactAccountRepo.find.mockResolvedValue({ items: 0, data: [] })
  })

  beforeEach(() => {
    sut = setupFindContacts(contactAccountRepo)
  })

  it('should call ContactAccountRepo.find with correct params', async () => {
    await sut(contactFindInputs)

    expect(contactAccountRepo.find).toHaveBeenCalledWith(contactFindInputs)
    expect(contactAccountRepo.find).toHaveBeenCalledTimes(1)
  })

  it('should return an object with items and data properties on success', async () => {
    const contactFindResult = await sut({})

    expect(contactFindResult).toEqual({ items: 0, data: [] })
  })

  it('should rethrow if ContactAccountRepo.find throws', async () => {
    contactAccountRepo.find.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({})

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })
})
