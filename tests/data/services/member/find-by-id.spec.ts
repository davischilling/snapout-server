import { MemberData, SocialTypes } from '@/domain/models'
import { FindMemberByIdService } from '@/domain/use-cases'
import { Repository as MemberDbRepo } from '@/data/contracts/repos'
import { setupFindMemberById } from '@/data/services'

import mongoose from 'mongoose'
import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/member')

describe('FindMemberByIdService', () => {
  let id: string
  let memberData: MemberData
  let memberAccountRepo: MockProxy<MemberDbRepo>
  let sut: FindMemberByIdService

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    memberData = {
      id,
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
    memberAccountRepo = mock()
    memberAccountRepo.findById.mockResolvedValue(memberData)
  })

  beforeEach(() => {
    sut = setupFindMemberById(memberAccountRepo)
  })

  it('should call MemberAccountRepo.findById with correct params', async () => {
    await sut({ id })

    expect(memberAccountRepo.findById).toHaveBeenCalledWith(id)
    expect(memberAccountRepo.findById).toHaveBeenCalledTimes(1)
  })

  it('should return an member on success', async () => {
    const memberFindByIdResult = await sut({ id })

    expect(memberFindByIdResult).toEqual(memberData)
  })

  it('should rethrow if MemberAccountRepo.findById throws', async () => {
    memberAccountRepo.findById.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })
})
