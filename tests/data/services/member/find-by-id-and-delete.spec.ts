import { FindMemberByIdAndDeleteService } from '@/domain/use-cases'
import { Repository as MemberDbRepo } from '@/data/contracts/repos'
import { setupFindMemberByIdAndDelete } from '@/data/services'

import mongoose from 'mongoose'
import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/member')

describe('FindMemberByIdAndDeleteService', () => {
  let id: string
  let memberAccountRepo: MockProxy<MemberDbRepo>
  let sut: FindMemberByIdAndDeleteService

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    memberAccountRepo = mock()
    memberAccountRepo.findByIdAndDelete.mockResolvedValue(id)
  })

  beforeEach(() => {
    sut = setupFindMemberByIdAndDelete(memberAccountRepo)
  })

  it('should call MemberAccountRepo.findByIdAndDelete with correct params', async () => {
    await sut({ id })

    expect(memberAccountRepo.findByIdAndDelete).toHaveBeenCalledWith(id)
    expect(memberAccountRepo.findByIdAndDelete).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if MemberAccountRepo.findByIdAndDelete throws', async () => {
    memberAccountRepo.findByIdAndDelete.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })

  it('should return the deleted member id on success', async () => {
    const memberFindByIdResult = await sut({ id })

    expect(memberFindByIdResult).toEqual({ id })
  })
})
