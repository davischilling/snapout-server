import { UserData } from '@/domain/models'

export type FindUsersService = (params: FindUsers.Input) => Promise<FindUsers.Output>

export namespace FindUsers {
  export type Input = any
  export type Output = { items: number, data: UserData[] } | Error
}
