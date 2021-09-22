import { UnauthorizedError } from '@/application/errors'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { SocialTypes } from '@/domain/models'
import { CreateMember } from '@/domain/use-cases'
import { CreateMemberController } from '@/main/controllers'

describe('CreateMemberController', () => {
  let memberData: CreateMember.Input
  let createMember: jest.Mock
  let sut: CreateMemberController

  beforeAll(() => {
    memberData = {
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
    createMember = jest.fn()
    createMember.mockResolvedValue({ id: 'member_id' })
  })

  beforeEach(() => {
    sut = new CreateMemberController(createMember)
  })

  it('should call createMember with correct params', async () => {
    await sut.handle(memberData)

    expect(createMember).toHaveBeenCalledWith(memberData)
    expect(createMember).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if createMember fails', async () => {
    createMember.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(memberData)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 201 if createMember succeeds', async () => {
    const httpResponse = await sut.handle(memberData)

    expect(httpResponse).toEqual({
      statusCode: 201,
      data: {
        id: 'member_id'
      }
    })
  })
})
