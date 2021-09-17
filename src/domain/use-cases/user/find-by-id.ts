import { UserData } from '@/domain/models'

export type FindUserByIdService = (params: FindUserById.Input) => Promise<FindUserById.Output>

export namespace FindUserById {
  export type Input = { id: string }
  export type Output = { user: UserData } | Error
}
