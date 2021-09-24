import { MemberPageInfo } from '@/data/entities'
import { MemberPageInfoData, SocialTypes } from '@/domain/models'

describe('MemberPageInfo', () => {
  let memberPageInfoData: MemberPageInfoData
  let sut: MemberPageInfo

  beforeEach(() => {
    memberPageInfoData = {
      pageTitlePicture: 'any_pageTitlePicture',
      title: 'any_title',
      paragraphs: [{
        paragraph: 'any_paragraph'
      }],
      socialsPhrase: 'any_socialsPhrase',
      socials: [{
        socialType: SocialTypes.facebook,
        socialUrl: 'any_socialUrl'
      }]
    }
  })

  it('should fill the attrs on the constructor with correct params', () => {
    sut = new MemberPageInfo(memberPageInfoData)

    expect(sut).toEqual(memberPageInfoData)
  })

  it('should update an memberPageInfo correctly', () => {
    sut = new MemberPageInfo(memberPageInfoData)

    const updatedMemberPageInfo = new MemberPageInfo({
      ...sut,
      ...{
        socials: [{
          socialType: SocialTypes.facebook,
          socialUrl: 'any_socialUrl1'
        }, {
          socialType: SocialTypes.instagram,
          socialUrl: 'any_socialUrl2'
        }]
      }
    })

    expect(updatedMemberPageInfo).toEqual({
      pageTitlePicture: 'any_pageTitlePicture',
      title: 'any_title',
      paragraphs: [{
        paragraph: 'any_paragraph'
      }],
      socialsPhrase: 'any_socialsPhrase',
      socials: [{
        socialType: SocialTypes.facebook,
        socialUrl: 'any_socialUrl1'
      }, {
        socialType: SocialTypes.instagram,
        socialUrl: 'any_socialUrl2'
      }]
    })
  })
})
