import { MemberData, MemberPageInfoData } from '@/domain/models'

export class Member {
  id?: string
  name: string
  role: string
  image: string
  alt: string
  memberUrlPage: string
  memberPageInfo: MemberPageInfoData

  constructor (
    memberData: MemberData
  ) {
    const {
      id,
      name,
      role,
      image,
      alt,
      memberUrlPage,
      memberPageInfo
    } = memberData
    if (id !== undefined) {
      this.id = id
    }
    this.name = name
    this.role = role
    this.image = image
    this.alt = alt
    this.memberUrlPage = memberUrlPage
    this.memberPageInfo = memberPageInfo
  }
}
