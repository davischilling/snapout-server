import { SignIn, SignInService } from '@/domain/use-cases'
import { setupSignIn } from '@/data/services'
import { Repository as AccountDbRepo } from '@/data/contracts/repos'
import { Encripter, Token } from '@/data/contracts/crypto'
import { UnauthorizedError } from '@/data/errors'

import { mock, MockProxy } from 'jest-mock-extended'
import { AccessTokenTypes } from '@/main/types'

jest.mock('@/data/entities/account')

describe('SignInService', () => {
  let accountRepo: MockProxy<AccountDbRepo>
  let cryptoHash: MockProxy<Encripter>
  let tokenGenerator: MockProxy<Token>
  let account: SignIn.Input
  let sut: SignInService

  beforeAll(() => {
    accountRepo = mock()
    accountRepo.find.mockResolvedValue({
      items: 1,
      data: [{
        id: 'any_id',
        email: 'any_email',
        password: 'any_password',
        role: 'any_role'
      }]
    })
    cryptoHash = mock()
    cryptoHash.compare.mockResolvedValue(true)
    tokenGenerator = mock()
    tokenGenerator.generate.mockResolvedValue('any_token_string')
  })

  beforeEach(() => {
    account = {
      email: 'any_email',
      password: 'any_password'
    }
    sut = setupSignIn(accountRepo, cryptoHash, tokenGenerator)
  })

  it('should call accountRepo.find with correct params', async () => {
    await sut(account)

    expect(accountRepo.find).toHaveBeenCalledWith({ email: account.email })
    expect(accountRepo.find).toHaveBeenCalledTimes(1)
  })

  it('should throw UnauthorizedError when accountRepo.find not returns 1 items', async () => {
    accountRepo.find.mockResolvedValueOnce({ items: 0, data: [] })

    const promise = sut(account)

    await expect(promise).rejects.toThrow(new UnauthorizedError('Invalid credentials.'))
  })

  it('should call cryptoHash.compare with correct params', async () => {
    await sut(account)

    expect(cryptoHash.compare).toHaveBeenCalledWith({ storedPassword: 'any_password', suppliedPassword: account.password })
    expect(cryptoHash.compare).toHaveBeenCalledTimes(1)
  })

  it('should throw UnauthorizedError when cryptoHash.compare returns false', async () => {
    cryptoHash.compare.mockResolvedValueOnce(false)

    const promise = sut(account)

    await expect(promise).rejects.toThrow(new UnauthorizedError('Invalid credentials.'))
  })

  it('should call tokenGenerator.generate with correct params', async () => {
    await sut(account)

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
    const signInResult = await sut(account)

    expect(signInResult).toEqual({ accessToken: 'any_token_string' })
  })

  it('should rethrow if accountRepo.find throws', async () => {
    accountRepo.find.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut(account)

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })

  it('should rethrow if cryptoHash.compare throws', async () => {
    cryptoHash.compare.mockRejectedValueOnce(new Error('compare_error'))

    const promise = sut(account)

    await expect(promise).rejects.toThrow(new Error('compare_error'))
  })

  it('should rethrow if tokenGenerator.generate throws', async () => {
    tokenGenerator.generate.mockRejectedValueOnce(new Error('generate_error'))

    const promise = sut(account)

    await expect(promise).rejects.toThrow(new Error('generate_error'))
  })
})
