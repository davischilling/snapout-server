import { AccessTokenTypes } from '@/main/types'
import { Token } from '@/data/contracts/crypto'
import { Repository as AccountDbRepo } from '@/data/contracts/repos'
import { UnauthorizedError } from '@/data/errors'
import { setupSignInAdminAccount } from '@/data/services'
import { RoleType } from '@/domain/models'
import { SignInAdminAccount, SignInAdminAccountService } from '@/domain/use-cases'

import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/account')

describe('SignInAdminAccountService', () => {
  let accountRepo: MockProxy<AccountDbRepo>
  let tokenGenerator: MockProxy<Token>
  let input: SignInAdminAccount.Input
  let sut: SignInAdminAccountService

  beforeAll(() => {
    accountRepo = mock()
    tokenGenerator = mock()
  })

  beforeEach(() => {
    input = {
      email: 'any_email'
    }
    accountRepo.find.mockResolvedValue({
      items: 1,
      data: [{
        id: 'any_id',
        email: 'any_email',
        password: 'any_password',
        role: RoleType.admin
      }]
    })
    tokenGenerator.generate.mockResolvedValue('any_token_string')
    sut = setupSignInAdminAccount(accountRepo, tokenGenerator)
  })

  it('should call accountRepo.find with correct params', async () => {
    await sut(input)

    expect(accountRepo.find).toHaveBeenCalledWith({ email: 'any_email' })
    expect(accountRepo.find).toHaveBeenCalledTimes(1)
  })

  it('should throw UnauthorizedError when accountRepo.find not returns 1 items', async () => {
    accountRepo.find.mockResolvedValueOnce({ items: 0, data: [] })

    const promise = sut(input)

    await expect(promise).rejects.toThrow(new UnauthorizedError('Email doesn\t exist.'))
  })

  it('should throw UnauthorizedError if returned account has no admin role', async () => {
    accountRepo.find.mockResolvedValueOnce({
      items: 1,
      data: [{
        id: 'any_id',
        email: 'any_email',
        password: 'any_password',
        role: RoleType.operator
      }]
    })

    const promise = sut(input)

    await expect(promise).rejects.toThrow(new UnauthorizedError('Account is not an administrator.'))
  })

  it('should call tokenGenerator.generate with correct params', async () => {
    await sut(input)

    expect(tokenGenerator.generate).toHaveBeenCalledWith({
      key: {
        id: 'any_id',
        type: AccessTokenTypes.access
      },
      expirationInMs: 86400000
    })
    expect(tokenGenerator.generate).toHaveBeenCalledTimes(1)
  })

  it('should return an accessToken on success', async () => {
    const SignInAdminAccountResult = await sut(input)

    expect(SignInAdminAccountResult).toEqual({ accessToken: 'any_token_string' })
  })

  it('should rethrow if accountRepo.find throws', async () => {
    accountRepo.find.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut(input)

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })

  it('should rethrow if tokenGenerator.generate throws', async () => {
    tokenGenerator.generate.mockRejectedValueOnce(new Error('generate_error'))

    const promise = sut(input)

    await expect(promise).rejects.toThrow(new Error('generate_error'))
  })
})
