import { ContactData } from '@/domain/models'

export class Contact {
  id?: string
  message: string
  email: string
  eventManager: string
  phone: string

  constructor (
    contactData: ContactData
  ) {
    const {
      id,
      message,
      email,
      eventManager,
      phone
    } = contactData
    if (id !== undefined) {
      this.id = id
    }
    this.message = message
    this.email = email
    this.eventManager = eventManager
    this.phone = phone
  }
}
