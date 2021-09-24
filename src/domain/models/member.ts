import { MemberPageInfoData } from './member-page-info'

export type MemberData = {
  id?: string
  name: string
  role: string
  image: string
  alt: string
  memberUrlPage: string
  memberPageInfo: MemberPageInfoData
}
