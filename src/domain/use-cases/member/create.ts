import { MemberPageInfoData } from '@/domain/models'

export type CreateMemberService = (params: CreateMember.Input) => Promise<CreateMember.Output>

export namespace CreateMember {
  export type MemberInputs = {
    name: string
    role: string
    image: string
    alt: string
    memberUrlPage: string
    memberPageInfo: MemberPageInfoData
  }
  export type Input = MemberInputs
  export type Output = { id: string } | Error
}
