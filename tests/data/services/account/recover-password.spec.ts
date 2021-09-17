import { AccessTokenTypes } from '@/main/types'
import { Encripter, Token } from '@/data/contracts/crypto'
import { Repository as AccountDbRepo } from '@/data/contracts/repos'
import { UnauthorizedError } from '@/data/errors'
import { setupRecoverAccountPassword } from '@/data/services'
import { RecoverAccountPassword, RecoverAccountPasswordService } from '@/domain/use-cases'

import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/account')

describe('RecoverAccountPasswordService', () => {
  let accountRepo: MockProxy<AccountDbRepo>
  let cryptoHash: MockProxy<Encripter>
  let tokenGenerator: MockProxy<Token>
  let input: RecoverAccountPassword.Input
  let sut: RecoverAccountPasswordService

  beforeAll(() => {
    accountRepo = mock()
    cryptoHash = mock()
    tokenGenerator = mock()
  })

  beforeEach(() => {
    input = {
      accountId: 'any_id',
      password: 'any_password',
      repeat_password: 'any_password'
    }
    accountRepo.findById.mockResolvedValue({
      id: 'any_id'
    })
    cryptoHash.toHash.mockResolvedValue('any_hashed_string')
    accountRepo.findByIdAndUpdate.mockResolvedValue({
      id: 'any_id'
    })
    tokenGenerator.generate.mockResolvedValue('any_token_string')
    sut = setupRecoverAccountPassword(accountRepo, cryptoHash, tokenGenerator)
  })

  it('should throw UnauthorizedError if password and repeat_password don\'t match', async () => {
    input.repeat_password = 'another_password'

    const promise = sut(input)

    await expect(promise).rejects.toThrow(new UnauthorizedError('Invalid credentials.'))
  })

  it('should call accountRepo.findById with correct params', async () => {
    await sut(input)

    expect(accountRepo.findById).toHaveBeenCalledWith(input.accountId)
    expect(accountRepo.findById).toHaveBeenCalledTimes(1)
  })

  it('should call cryptoHash.toHash with correct params', async () => {
    await sut(input)

    expect(cryptoHash.toHash).toHaveBeenCalledWith('any_password')
    expect(cryptoHash.toHash).toHaveBeenCalledTimes(1)
  })

  it('should call accountRepo.findByIdAndUpdate with the updated Account entity', async () => {
    await sut(input)

    expect(accountRepo.findByIdAndUpdate).toHaveBeenCalledWith('any_id', { password: 'any_hashed_string' })
    expect(accountRepo.findByIdAndUpdate).toHaveBeenCalledTimes(1)
  })

  it('should call tokenGenerator.generate with correct params', async () => {
    await sut(input)

    expect(tokenGenerator.generate).toHaveBeenCalledWith({
      key: {
        id: 'any_id',
        type: AccessTokenTypes.access
      },
      expirationInMs: 1800000
    })
    expect(tokenGenerator.generate).toHaveBeenCalledTimes(1)
  })

  it('should return an accessToken on success', async () => {
    const RecoverAccountPasswordResult = await sut(input)

    expect(RecoverAccountPasswordResult).toEqual({ accessToken: 'any_token_string' })
  })

  it('should rethrow if accountRepo.findById throws', async () => {
    accountRepo.findById.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut(input)

    await expect(promise).rejects.toThrow(new Error('repo_error'))
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

  it('should rethrow if tokenGenerator.generate throws', async () => {
    tokenGenerator.generate.mockRejectedValueOnce(new Error('generate_error'))

    const promise = sut(input)

    await expect(promise).rejects.toThrow(new Error('generate_error'))
  })
})
