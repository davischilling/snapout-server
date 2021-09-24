import { Social } from '@/data/entities'
import { SocialData, SocialTypes } from '@/domain/models'

describe('Social', () => {
  let socialData: SocialData
  let sut: Social

  beforeEach(() => {
    socialData = {
      socialType: SocialTypes.facebook,
      socialUrl: 'any_socialUrl'
    }
  })

  it('should fill the attrs on the constructor with correct params', () => {
    sut = new Social(socialData)

    expect(sut).toEqual(socialData)
  })

  it('should update an social correctly', () => {
    sut = new Social(socialData)

    const updatedSocial = new Social({ ...sut, ...{ socialType: SocialTypes.instagram } })

    expect(updatedSocial).toEqual({
      socialType: SocialTypes.instagram,
      socialUrl: 'any_socialUrl'
    })
  })
})
