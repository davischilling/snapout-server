import { ContactData } from '@/domain/models'

export type FindContactByIdService = (params: FindContactById.Input) => Promise<FindContactById.Output>

export namespace FindContactById {
  export type Input = { id: string }
  export type Output = { contact: ContactData } | Error
}
