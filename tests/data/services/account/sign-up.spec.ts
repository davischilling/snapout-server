import { SignUp, SignUpService } from '@/domain/use-cases'
import { setupSignUp } from '@/data/services'
import { Repository as AccountDbRepo } from '@/data/contracts/repos'
import { Encripter, Token } from '@/data/contracts/crypto'
import { UnauthorizedError } from '@/data/errors'
import { Account } from '@/data/entities'

import { mock, MockProxy } from 'jest-mock-extended'
import { mocked } from 'ts-jest/utils'
import { AccessTokenTypes } from '@/main/types'

jest.mock('@/data/entities/account')

describe('SignUpService', () => {
  let accountRepo: MockProxy<AccountDbRepo>
  let cryptoHash: MockProxy<Encripter>
  let tokenGenerator: MockProxy<Token>
  let account: SignUp.Input
  let sut: SignUpService

  beforeAll(() => {
    accountRepo = mock()
    cryptoHash = mock()
    tokenGenerator = mock()
  })

  beforeEach(() => {
    account = {
      name: 'any_name',
      phone: 'any_phone',
      email: 'any_email',
      password: 'any_password',
      repeat_password: 'any_password'
    }
    accountRepo.find.mockResolvedValue({ items: 0, data: [] })
    accountRepo.create.mockResolvedValue('new_account_id')
    cryptoHash.toHash.mockResolvedValue('any_hashed_string')
    tokenGenerator.generate.mockResolvedValue('any_token_string')
    sut = setupSignUp(accountRepo, cryptoHash, tokenGenerator)
  })

  it('should throw UnauthorizedError if password and repeat_password don\'t match', async () => {
    account.repeat_password = 'another_password'

    const promise = sut(account)

    await expect(promise).rejects.toThrow(new UnauthorizedError('Invalid credentials.'))
  })

  it('should call accountRepo.find with correct params', async () => {
    await sut(account)

    expect(accountRepo.find).toHaveBeenCalledWith({ email: account.email })
    expect(accountRepo.find).toHaveBeenCalledTimes(1)
  })

  it('should throw UnauthorizedError when accountRepo.find returns any items', async () => {
    accountRepo.find.mockResolvedValueOnce({ items: 1, data: [] })

    const promise = sut(account)

    await expect(promise).rejects.toThrow(new UnauthorizedError('Invalid credentials.'))
  })

  it('should call cryptoHash.toHash with correct params', async () => {
    await sut(account)

    expect(cryptoHash.toHash).toHaveBeenCalledWith(account.password)
    expect(cryptoHash.toHash).toHaveBeenCalledTimes(1)
  })

  it('should call accountRepo.create with the instaciated Account entity', async () => {
    const AccountStub = jest.fn().mockImplementation(() => ({ any: 'any' }))
    mocked(Account).mockImplementation(AccountStub)

    await sut(account)

    expect(accountRepo.create).toHaveBeenCalledWith({ any: 'any' })
    expect(accountRepo.create).toHaveBeenCalledTimes(1)
  })

  it('should call tokenGenerator.generate with correct params', async () => {
    await sut(account)

    expect(tokenGenerator.generate).toHaveBeenCalledWith({
      key: {
        id: 'new_account_id',
        type: AccessTokenTypes.access
      },
      expirationInMs: 1800000
    })
    expect(tokenGenerator.generate).toHaveBeenCalledTimes(1)
  })

  it('should return an accessToken on success', async () => {
    const signUpResult = await sut(account)

    expect(signUpResult).toEqual({ accessToken: 'any_token_string' })
  })

  it('should rethrow if accountRepo.find throws', async () => {
    accountRepo.find.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut(account)

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })

  it('should rethrow if cryptoHash.toHash throws', async () => {
    cryptoHash.toHash.mockRejectedValueOnce(new Error('to_hash_error'))

    const promise = sut(account)

    await expect(promise).rejects.toThrow(new Error('to_hash_error'))
  })

  it('should rethrow if accountRepo.create throws', async () => {
    accountRepo.create.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut(account)

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })

  it('should rethrow if tokenGenerator.generate throws', async () => {
    tokenGenerator.generate.mockRejectedValueOnce(new Error('generate_error'))

    const promise = sut(account)

    await expect(promise).rejects.toThrow(new Error('generate_error'))
  })
})
