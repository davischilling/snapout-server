import { UnauthorizedError } from '@/application/errors'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { CreateContact } from '@/domain/use-cases'
import { CreateContactController } from '@/main/controllers'

describe('CreateContactController', () => {
  let contactData: CreateContact.input
  let createContact: jest.Mock
  let sut: CreateContactController

  beforeAll(() => {
    contactData = {
      message: 'any_message',
      email: 'any_email',
      eventManager: 'any_eventManager',
      phone: 'any_phone'
    }
    createContact = jest.fn()
    createContact.mockResolvedValue({ id: 'contact_id' })
  })

  beforeEach(() => {
    sut = new CreateContactController(createContact)
  })

  it('should call createContact with correct params', async () => {
    await sut.handle(contactData)

    expect(createContact).toHaveBeenCalledWith(contactData)
    expect(createContact).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if createContact fails', async () => {
    createContact.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(contactData)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 201 if createContact succeeds', async () => {
    const httpResponse = await sut.handle(contactData)

    expect(httpResponse).toEqual({
      statusCode: 201,
      data: {
        id: 'contact_id'
      }
    })
  })
})
