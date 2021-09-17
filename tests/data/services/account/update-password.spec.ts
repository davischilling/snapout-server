import { UpdateAccountPassword, UpdateAccountPasswordService } from '@/domain/use-cases'
import { Encripter } from '@/data/contracts/crypto'
import { Repository as AccountDbRepo } from '@/data/contracts/repos'
import { UnauthorizedError } from '@/data/errors'
import { setupUpdateAccountPassword } from '@/data/services'

import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/account')

describe('UpdateAccountPasswordService', () => {
  let accountRepo: MockProxy<AccountDbRepo>
  let cryptoHash: MockProxy<Encripter>
  let input: UpdateAccountPassword.Input
  let sut: UpdateAccountPasswordService

  beforeAll(() => {
    accountRepo = mock()
    cryptoHash = mock()
  })

  beforeEach(() => {
    input = {
      accountId: 'any_id',
      old_password: 'old_password',
      password: 'any_password',
      repeat_password: 'any_password'
    }
    accountRepo.findById.mockResolvedValue({
      id: 'any_id',
      email: 'any_email',
      password: 'any_password',
      role: 'any_role'
    })
    cryptoHash.compare.mockResolvedValue(true)
    cryptoHash.toHash.mockResolvedValue('any_hashed_string')
    accountRepo.findByIdAndUpdate.mockResolvedValue({
      id: 'any_id',
      email: 'any_email',
      password: 'updated_password',
      role: 'any_role',
      name: 'any_name',
      phone: 'any_phone'
    })
    sut = setupUpdateAccountPassword(accountRepo, cryptoHash)
  })

  it('should call accountRepo.findById with correct params', async () => {
    await sut(input)

    expect(accountRepo.findById).toHaveBeenCalledWith('any_id')
    expect(accountRepo.findById).toHaveBeenCalledTimes(1)
  })

  it('should throw UnauthorizedError if password and repeat_password don\'t match', async () => {
    input.repeat_password = 'another_password'

    const promise = sut(input)

    await expect(promise).rejects.toThrow(new UnauthorizedError('Invalid credentials.'))
  })

  it('should call cryptoHash.compare with correct params', async () => {
    await sut(input)

    expect(cryptoHash.compare).toHaveBeenCalledWith({ storedPassword: 'any_password', suppliedPassword: input.old_password })
    expect(cryptoHash.compare).toHaveBeenCalledTimes(1)
  })

  it('should throw UnauthorizedError if the old password given is wrong', async () => {
    cryptoHash.compare.mockResolvedValueOnce(false)

    const promise = sut(input)

    await expect(promise).rejects.toThrow(new UnauthorizedError('Invalid credentials.'))
  })

  it('should call cryptoHash.toHash with correct params', async () => {
    await sut(input)

    expect(cryptoHash.toHash).toHaveBeenCalledWith(input.password)
    expect(cryptoHash.toHash).toHaveBeenCalledTimes(1)
  })

  it('should call accountRepo.findByIdAndUpdate with the id and hashed password', async () => {
    await sut(input)

    expect(accountRepo.findByIdAndUpdate).toHaveBeenCalledWith('any_id', { password: 'any_hashed_string' })
    expect(accountRepo.findByIdAndUpdate).toHaveBeenCalledTimes(1)
  })

  it('should return an updated account without password and role on success', async () => {
    const updateAccountPasswordResult = await sut(input)

    expect(updateAccountPasswordResult).toEqual({ id: 'any_id', name: 'any_name', email: 'any_email', phone: 'any_phone' })
  })

  it('should rethrow if accountRepo.findById throws', async () => {
    accountRepo.findById.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut(input)

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })

  it('should rethrow if cryptoHash.compare throws', async () => {
    cryptoHash.compare.mockRejectedValueOnce(new Error('compare_error'))

    const promise = sut(input)

    await expect(promise).rejects.toThrow(new Error('compare_error'))
  })

  it('should rethrow if cryptoHash.toHash throws', async () => {
    cryptoHash.toHash.mockRejectedValueOnce(new Error('to_hash_error'))

    const promise = sut(input)

    await expect(promise).rejects.toThrow(new Error('to_hash_error'))
  })

  it('should rethrow if accountRepo.findByIdAndUpdate throws', async () => {
    accountRepo.findByIdAndUpdate.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut(input)

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })
})
