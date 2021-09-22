import { FindMembers, FindMembersService } from '@/domain/use-cases'
import { Repository as MemberDbRepo } from '@/data/contracts/repos'
import { setupFindMembers } from '@/data/services'

import { mock, MockProxy } from 'jest-mock-extended'
import { SocialTypes } from '@/domain/models'

jest.mock('@/data/entities/member')

describe('FindMembersService', () => {
  let memberFindInputs: FindMembers.Input
  let memberAccountRepo: MockProxy<MemberDbRepo>
  let sut: FindMembersService

  beforeAll(() => {
    memberFindInputs = {
      memberPageInfo: {
        socials: [{
          socialType: SocialTypes.instagram
        }]
      }
    }
    memberAccountRepo = mock()
    memberAccountRepo.find.mockResolvedValue({ items: 0, data: [] })
  })

  beforeEach(() => {
    sut = setupFindMembers(memberAccountRepo)
  })

  it('should call MemberAccountRepo.find with correct params', async () => {
    await sut(memberFindInputs)

    expect(memberAccountRepo.find).toHaveBeenCalledWith(memberFindInputs)
    expect(memberAccountRepo.find).toHaveBeenCalledTimes(1)
  })

  it('should return an object with items and data properties on success', async () => {
    const memberFindResult = await sut({})

    expect(memberFindResult).toEqual({ items: 0, data: [] })
  })

  it('should rethrow if MemberAccountRepo.find throws', async () => {
    memberAccountRepo.find.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({})

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })
})
