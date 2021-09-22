import { SocialData, SocialTypes } from '@/domain/models'

export class Social {
  id?: string
  socialType: SocialTypes
  socialUrl: string

  constructor (
    SocialData: SocialData
  ) {
    const {
      id,
      socialType,
      socialUrl
    } = SocialData
    if (id !== undefined) {
      this.id = id
    }
    this.socialType = socialType
    this.socialUrl = socialUrl
  }
}
