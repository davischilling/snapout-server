import { ContactData } from '@/domain/models'

export type FindContactsService = (params: FindContacts.Input) => Promise<FindContacts.Output>

export namespace FindContacts {
  export type Input = {
    message?: string
    email?: string
    eventManager?: string
    phone?: string
  }
  export type Output = { items: number, data: ContactData[] } | Error
}
