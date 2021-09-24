import { SocialData, SocialTypes } from '@/domain/models'

export class Social {
  socialType: SocialTypes
  socialUrl: string

  constructor (
    SocialData: SocialData
  ) {
    const {
      socialType,
      socialUrl
    } = SocialData
    this.socialType = socialType
    this.socialUrl = socialUrl
  }
}
