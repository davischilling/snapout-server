import { Member } from '@/data/entities'
import { MemberData, SocialTypes } from '@/domain/models'

describe('Member', () => {
  let memberData: MemberData
  let sut: Member

  beforeEach(() => {
    memberData = {
      name: 'any_name',
      role: 'any_role',
      image: 'any_image',
      alt: 'any_alt',
      memberUrlPage: 'any_memberUrlPage',
      memberPageInfo: {
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
    }
  })

  it('should fill the attrs on the constructor with correct params', () => {
    sut = new Member(memberData)

    expect(sut).toEqual(memberData)
  })

  it('should update an member correctly', () => {
    sut = new Member(memberData)
    sut.id = 'any_member_id'
    const updatedParams = {
      name: 'any_name',
      role: 'any_role',
      image: 'any_image',
      alt: 'any_alt',
      memberUrlPage: 'any_memberUrlPage',
      memberPageInfo: {
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
      }
    }

    const updatedMember = new Member({ ...sut, ...updatedParams })

    expect(updatedMember).toEqual({
      id: 'any_member_id',
      name: 'any_name',
      role: 'any_role',
      image: 'any_image',
      alt: 'any_alt',
      memberUrlPage: 'any_memberUrlPage',
      memberPageInfo: {
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
      }
    })
  })
})
