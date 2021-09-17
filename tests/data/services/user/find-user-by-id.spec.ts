import { GenderType, PhysicalActivityLevelType, UserData } from '@/domain/models'
import { FindUserByIdService } from '@/domain/use-cases/user'
import { Repository as UserDbRepo } from '@/data/contracts/repos'
import { setupFindUserById } from '@/data/services'

import mongoose from 'mongoose'
import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/user')

describe('FindUserByIdService', () => {
  let id: string
  let accountId: string
  let user: UserData
  let userRepo: MockProxy<UserDbRepo>
  let sut: FindUserByIdService

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    accountId = new mongoose.Types.ObjectId().toHexString()
    user = {
      id,
      accountId,
      gender: GenderType.masculine,
      age: 32,
      height: 173,
      initialWeight: 69,
      physicalActivityLevel: PhysicalActivityLevelType.fourToFive
    }
    userRepo = mock()
    userRepo.findById.mockResolvedValue(user)
  })

  beforeEach(() => {
    sut = setupFindUserById(userRepo)
  })

  it('should call UserRepo.findById with correct params', async () => {
    await sut({ id })

    expect(userRepo.findById).toHaveBeenCalledWith(id)
    expect(userRepo.findById).toHaveBeenCalledTimes(1)
  })

  it('should return an user on success', async () => {
    const userFindByIdResult = await sut({ id })

    expect(userFindByIdResult).toEqual(user)
  })

  it('should rethrow if UserRepo.findById throws', async () => {
    userRepo.findById.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })
})
