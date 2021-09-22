import { FindMemberByIdAndUpdateController } from '@/main/controllers'
import { MemberData, SocialTypes } from '@/domain/models'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

import mongoose from 'mongoose'

describe('FindMemberByIdAndUpdateController', () => {
  let id: string
  let memberData: MemberData
  let findMemberByIdAndUpdateService: jest.Mock
  let sut: FindMemberByIdAndUpdateController

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    memberData = {
      id,
      name: 'any_',
      role: 'any_',
      image: 'any_',
      alt: 'any_',
      memberUrlPage: 'any_',
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
    findMemberByIdAndUpdateService = jest.fn()
    findMemberByIdAndUpdateService.mockResolvedValue(memberData)
  })

  beforeEach(() => {
    sut = new FindMemberByIdAndUpdateController(findMemberByIdAndUpdateService)
  })

  it('should call findMemberByIdAndUpdateService with correct params', async () => {
    await sut.handle({ params: { data: 'any_data', id } })

    expect(findMemberByIdAndUpdateService).toHaveBeenCalledWith({ params: { data: 'any_data', id } })
    expect(findMemberByIdAndUpdateService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findMemberByIdAndUpdateService fails', async () => {
    findMemberByIdAndUpdateService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle({ params: { data: 'any_data', id } })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findMemberByIdAndUpdateService succeeds', async () => {
    const httpResponse = await sut.handle({ params: { data: 'any_data', id } })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: memberData
    })
  })
})
