import { FindMemberByIdAndUpdate, FindMemberByIdAndUpdateService } from '@/domain/use-cases'
import { Repository as MemberDbRepo } from '@/data/contracts/repos'
import { setupFindMemberByIdAndUpdate } from '@/data/services'
import { Member } from '@/data/entities'

import mongoose from 'mongoose'
import { mock, MockProxy } from 'jest-mock-extended'
import { MemberData, SocialTypes } from '@/domain/models'

jest.mock('@/data/entities/member')

describe('FindMemberByIdAndUpdateService', () => {
  let id: string
  let memberData: MemberData
  let memberUpdateInputs: FindMemberByIdAndUpdate.Input
  let memberAccountRepo: MockProxy<MemberDbRepo>
  let mockUpdatedMember: MemberData
  let sut: FindMemberByIdAndUpdateService

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    memberUpdateInputs = {
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
          socialUrl: 'any_socialUrl1'
        }, {
          socialType: SocialTypes.instagram,
          socialUrl: 'any_socialUrl2'
        }]
      }
    }
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
    sut = setupFindMemberByIdAndUpdate(memberAccountRepo)
  })

  it('should call MemberAccountRepo.findById with correct params', async () => {
    await sut(memberUpdateInputs)

    expect(memberAccountRepo.findById).toHaveBeenCalledWith(id)
    expect(memberAccountRepo.findById).toHaveBeenCalledTimes(1)
  })

  it('should call MemberAccountRepo.findByIdAndUpdate with correct params', async () => {
    const updatedMember = new Member({ ...memberData, ...memberUpdateInputs })

    await sut(memberUpdateInputs)

    expect(memberAccountRepo.findByIdAndUpdate).toHaveBeenCalledWith(id, updatedMember)
    expect(memberAccountRepo.findByIdAndUpdate).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if MemberAccountRepo.findByIdAndUpdate throws', async () => {
    memberAccountRepo.findByIdAndUpdate.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut(memberUpdateInputs)

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })

  it('should return an updated member on success', async () => {
    const updatedMember = new Member({ ...memberData, ...memberUpdateInputs })
    memberAccountRepo.findByIdAndUpdate.mockResolvedValueOnce(updatedMember)

    const memberFindByIdResult = await sut(memberUpdateInputs)

    expect(memberFindByIdResult).toEqual(updatedMember)
  })
})
