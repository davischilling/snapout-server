import { ContactData } from '@/domain/models'

export type FindContactByIdAndUpdateService = (params: FindContactByIdAndUpdate.Input) => Promise<FindContactByIdAndUpdate.Output>

export namespace FindContactByIdAndUpdate {
  export type Input = {
    id: string
    message: string
    email: string
    eventManager: string
    phone: string
  }
  export type Output = { contact: ContactData } | Error
}
