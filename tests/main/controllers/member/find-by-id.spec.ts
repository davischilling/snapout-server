import { FindMemberByIdController } from '@/main/controllers'
import { MemberData, SocialTypes } from '@/domain/models'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

import mongoose from 'mongoose'

describe('FindMemberByIdController', () => {
  let id: string
  let memberData: MemberData
  let findMemberByIdService: jest.Mock
  let sut: FindMemberByIdController

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
    findMemberByIdService = jest.fn()
    findMemberByIdService.mockResolvedValue(memberData)
  })

  beforeEach(() => {
    sut = new FindMemberByIdController(findMemberByIdService)
  })

  it('should call findMemberByIdService with correct params', async () => {
    await sut.handle(id)

    expect(findMemberByIdService).toHaveBeenCalledWith(id)
    expect(findMemberByIdService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findMemberByIdService fails', async () => {
    findMemberByIdService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findMemberByIdService succeeds', async () => {
    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: memberData
    })
  })
})
