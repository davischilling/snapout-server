import { Repository as ContactDbRepo } from '@/data/contracts/repos'
import { Contact } from '@/data/entities'
import { setupCreateContact } from '@/data/services'
import { CreateContact, CreateContactService } from '@/domain/use-cases'
import { mock, MockProxy } from 'jest-mock-extended'
import { mocked } from 'ts-jest/utils'

jest.mock('@/data/entities/contact')

describe('CreateContactService', () => {
  let contactAccountRepo: MockProxy<ContactDbRepo>
  const createContactInput: CreateContact.ContactInputs = {
    message: 'any_message',
    email: 'any_email',
    eventManager: 'any_eventManager',
    phone: 'any_phone'
  }
  let sut: CreateContactService

  beforeAll(() => {
    contactAccountRepo = mock()
    contactAccountRepo.find.mockResolvedValue({ items: 0, data: [] })
    contactAccountRepo.create.mockResolvedValue('contact_id')
  })

  beforeEach(() => {
    sut = setupCreateContact(contactAccountRepo)
  })

  it('should call ContactRepo.create with Contact entity', async () => {
    const ContactStub = jest.fn().mockImplementation(() => ({ any: 'any' }))
    mocked(Contact).mockImplementation(ContactStub)

    await sut(createContactInput)

    expect(contactAccountRepo.create).toHaveBeenCalledWith({ any: 'any' })
    expect(contactAccountRepo.create).toHaveBeenCalledTimes(1)
  })

  it('should return an id on success', async () => {
    const contactCreateResult = await sut(createContactInput)

    expect(contactCreateResult).toEqual({ id: 'contact_id' })
  })

  it('should rethrow if ContactAccountRepo.create throws', async () => {
    contactAccountRepo.create.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut(createContactInput)

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })
})
