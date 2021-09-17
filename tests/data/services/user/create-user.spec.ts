import { CreateUser, CreateUserService } from '@/domain/use-cases/user'
import { Repository as UserDbRepo } from '@/data/contracts/repos'
import { setupCreateUser } from '@/data/services'
import { GenderType, PhysicalActivityLevelType } from '@/domain/models'
import { UnauthorizedError } from '@/data/errors'
import { User } from '@/data/entities'

import { mock, MockProxy } from 'jest-mock-extended'
import { mocked } from 'ts-jest/utils'

jest.mock('@/data/entities/user')

describe('CreateUserService', () => {
  let userRepo: MockProxy<UserDbRepo>
  let user: CreateUser.UserInputs
  let sut: CreateUserService

  beforeAll(() => {
    user = {
      accountId: 'any_account_id',
      gender: GenderType.masculine,
      age: 32,
      height: 173,
      initialWeight: 67,
      physicalActivityLevel: PhysicalActivityLevelType.fourToFive
    }
    userRepo = mock()
    userRepo.find.mockResolvedValue({ items: 0, data: [] })
    userRepo.create.mockResolvedValue('user_id')
  })

  beforeEach(() => {
    sut = setupCreateUser(userRepo)
  })

  it('should call UserRepo.find with correct params', async () => {
    await sut(user)

    expect(userRepo.find).toHaveBeenCalledWith({ accountId: user.accountId })
    expect(userRepo.find).toHaveBeenCalledTimes(1)
  })

  it('should throw UnauthorizedError when UserRepo.find returns 1 item', async () => {
    userRepo.find.mockResolvedValueOnce({ items: 1, data: [] })

    const promise = sut(user)

    await expect(promise).rejects.toThrow(new UnauthorizedError('User already exists'))
  })

  it('should call UserRepo.create when UserRepo.find returns 0 item with User entity', async () => {
    const UserStub = jest.fn().mockImplementation(() => ({ any: 'any' }))
    mocked(User).mockImplementation(UserStub)

    await sut(user)

    expect(userRepo.create).toHaveBeenCalledWith({ any: 'any' })
    expect(userRepo.create).toHaveBeenCalledTimes(1)
  })

  it('should return an id on success', async () => {
    const userCreateResult = await sut(user)

    expect(userCreateResult).toEqual({ id: 'user_id' })
  })

  it('should rethrow if UserRepo.find throws', async () => {
    userRepo.find.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut(user)

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })

  it('should rethrow if UserRepo.create throws', async () => {
    userRepo.create.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut(user)

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })
})
