import { MemberData } from '@/domain/models'

export type FindMemberByIdService = (params: FindMemberById.Input) => Promise<FindMemberById.Output>

export namespace FindMemberById {
  export type Input = { id: string }
  export type Output = { member: MemberData } | Error
}
