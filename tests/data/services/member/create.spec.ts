import { Repository as MemberDbRepo } from '@/data/contracts/repos'
import { Member } from '@/data/entities'
import { setupCreateMember } from '@/data/services'
import { SocialTypes } from '@/domain/models'
import { CreateMember, CreateMemberService } from '@/domain/use-cases'
import { mock, MockProxy } from 'jest-mock-extended'
import { mocked } from 'ts-jest/utils'

jest.mock('@/data/entities/member')

describe('CreateMemberService', () => {
  let memberAccountRepo: MockProxy<MemberDbRepo>
  const createMemberInput: CreateMember.MemberInputs = {
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
  let sut: CreateMemberService

  beforeAll(() => {
    memberAccountRepo = mock()
    memberAccountRepo.find.mockResolvedValue({ items: 0, data: [] })
    memberAccountRepo.create.mockResolvedValue('member_id')
  })

  beforeEach(() => {
    sut = setupCreateMember(memberAccountRepo)
  })

  it('should call MemberRepo.create with Member entity', async () => {
    const MemberStub = jest.fn().mockImplementation(() => ({ any: 'any' }))
    mocked(Member).mockImplementation(MemberStub)

    await sut(createMemberInput)

    expect(memberAccountRepo.create).toHaveBeenCalledWith({ any: 'any' })
    expect(memberAccountRepo.create).toHaveBeenCalledTimes(1)
  })

  it('should return an id on success', async () => {
    const memberCreateResult = await sut(createMemberInput)

    expect(memberCreateResult).toEqual({ id: 'member_id' })
  })

  it('should rethrow if MemberAccountRepo.create throws', async () => {
    memberAccountRepo.create.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut(createMemberInput)

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })
})
