import { Contact } from '@/data/entities'
import { ContactData } from '@/domain/models'

describe('Contact', () => {
    let contactData: ContactData
    let sut: Contact

    beforeEach(() => {
        contactData = {
          message: 'any_message',
          email: 'any_email',
          eventManager: 'any_eventManager',
          phone: 'any_phone'
        }
    })

    it('should fill the attrs on the constructor with correct params', () => {
        sut = new Contact(contactData)

        expect(sut).toEqual(contactData)
    })

    it('should update an contact correctly', () => {
      sut = new Contact(contactData)
      sut.id = 'any_contact_id'

      const updatedContact = new Contact({ ...sut, ...{ email: 'new_email', phone: 'new_phone' }})

      expect(updatedContact).toEqual({
        id: 'any_contact_id',
        message: 'any_message',
        email: 'new_email',
        eventManager: 'any_eventManager',
        phone: 'new_phone'
      })
  })
})
