import { FindUsersService } from '@/domain/use-cases/user'
import { Repository as UserDbRepo } from '@/data/contracts/repos'
import { setupFindUsers } from '@/data/services'

import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/user')

describe('FindUsersService', () => {
  let userRepo: MockProxy<UserDbRepo>
  let sut: FindUsersService

  beforeAll(() => {
    userRepo = mock()
    userRepo.find.mockResolvedValue({ items: 0, data: [] })
  })

  beforeEach(() => {
    sut = setupFindUsers(userRepo)
  })

  it('should call UserRepo.find with correct params', async () => {
    await sut({ data: 'any' })

    expect(userRepo.find).toHaveBeenCalledWith({ data: 'any' })
    expect(userRepo.find).toHaveBeenCalledTimes(1)
  })

  it('should return an object with items and data properties on success', async () => {
    const userFindResult = await sut({})

    expect(userFindResult).toEqual({ items: 0, data: [] })
  })

  it('should rethrow if UserRepo.find throws', async () => {
    userRepo.find.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({})

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })
})
