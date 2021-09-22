import { MemberData, MemberPageInfoData } from '@/domain/models'

export type FindMemberByIdAndUpdateService = (params: FindMemberByIdAndUpdate.Input) => Promise<FindMemberByIdAndUpdate.Output>

export namespace FindMemberByIdAndUpdate {
  export type Input = {
    id: string
    name: string
    role: string
    image: string
    alt: string
    memberUrlPage: string
    memberPageInfo: MemberPageInfoData
  }
  export type Output = { member: MemberData } | Error
}
