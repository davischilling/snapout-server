import { FindUserByIdAndDeleteService } from '@/domain/use-cases/user'
import { Repository as UserDbRepo } from '@/data/contracts/repos'
import { setupFindUserByIdAndDelete } from '@/data/services'

import mongoose from 'mongoose'
import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/user')

describe('FindUserByIdAndDeleteService', () => {
  let id: string
  let userRepo: MockProxy<UserDbRepo>
  let sut: FindUserByIdAndDeleteService

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    userRepo = mock()
    userRepo.findByIdAndDelete.mockResolvedValue(id)
  })

  beforeEach(() => {
    sut = setupFindUserByIdAndDelete(userRepo)
  })

  it('should call UserRepo.findByIdAndDelete with correct params', async () => {
    await sut({ id })

    expect(userRepo.findByIdAndDelete).toHaveBeenCalledWith(id)
    expect(userRepo.findByIdAndDelete).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if UserRepo.findByIdAndDelete throws', async () => {
    userRepo.findByIdAndDelete.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })

  it('should return the deleted user id on success', async () => {
    const userFindByIdResult = await sut({ id })

    expect(userFindByIdResult).toEqual({ id })
  })
})
