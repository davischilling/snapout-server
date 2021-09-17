import { Repository as UserDbRepo } from '@/data/contracts/repos'
import { User } from '@/data/entities'
import { setupFindUserByIdAndUpdate } from '@/data/services'
import { GenderType, PhysicalActivityLevelType, UserData } from '@/domain/models'
import { FindUserByIdAndUpdateService } from '@/domain/use-cases'

import { mock, MockProxy } from 'jest-mock-extended'
import mongoose from 'mongoose'

jest.mock('@/data/entities/user')

describe('FindUserByIdAndUpdateService', () => {
  let id: string
  let accountId: string
  let user: UserData
  let userRepo: MockProxy<UserDbRepo>
  let spyUser: any
  let mockUpdatedUser: User
  let sut: FindUserByIdAndUpdateService

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
    mockUpdatedUser = new User(user)
    spyUser = jest.spyOn(User, 'update').mockReturnValue(mockUpdatedUser)
  })

  beforeEach(() => {
    sut = setupFindUserByIdAndUpdate(userRepo)
  })

  it('should call UserRepo.findById with correct params', async () => {
    await sut({ id, age: 33 })

    expect(userRepo.findById).toHaveBeenCalledWith(id)
    expect(userRepo.findById).toHaveBeenCalledTimes(1)
  })

  it('should call User entity update method with correct params', async () => {
    await sut({ id, age: 33 })

    expect(spyUser).toHaveBeenCalledWith(user, { id, age: 33 })
    expect(spyUser).toHaveBeenCalledTimes(1)
  })

  it('should call UserRepo.findByIdAndUpdate with correct params', async () => {
    await sut({ id, age: 33 })

    expect(userRepo.findByIdAndUpdate).toHaveBeenCalledWith(id, mockUpdatedUser)
    expect(userRepo.findByIdAndUpdate).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if UserRepo.findByIdAndUpdate throws', async () => {
    userRepo.findByIdAndUpdate.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({ id, age: 33 })

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })

  it('should return an updated user on success', async () => {
    mockUpdatedUser.age = 33
    userRepo.findByIdAndUpdate.mockResolvedValueOnce(mockUpdatedUser)

    const userFindByIdResult = await sut({ age: 33, id })

    expect(userFindByIdResult).toEqual(mockUpdatedUser)
  })
})
