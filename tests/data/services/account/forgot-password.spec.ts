import { ForgotAccountPassword, ForgotAccountPasswordService } from '@/domain/use-cases'
import { setupForgotAccountPassword } from '@/data/services'
import { Repository as AccountDbRepo } from '@/data/contracts/repos'
import { Token } from '@/data/contracts/crypto'
import { UnauthorizedError } from '@/data/errors'
import { AccessTokenTypes } from '@/main/types'
// import { Account } from '@/data/entities'

import { mock, MockProxy } from 'jest-mock-extended'
// import { mocked } from 'ts-jest/utils'

jest.mock('@/data/entities/account')

describe('ForgotAccountPasswordService', () => {
  let accountRepo: MockProxy<AccountDbRepo>
  let tokenGenerator: MockProxy<Token>
  let input: ForgotAccountPassword.Input
  let sut: ForgotAccountPasswordService

  beforeAll(() => {
    accountRepo = mock()
    accountRepo.find.mockResolvedValue({
      items: 1,
      data: [{
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        phone: 'any_phone',
        role: 'any_role',
        password: 'any_password'
      }]
    })
    accountRepo.create.mockResolvedValue('new_account_id')
    tokenGenerator = mock()
    tokenGenerator.generate.mockResolvedValue('any_token_string')
  })

  beforeEach(() => {
    input = {
      email: 'any_email'
    }
    sut = setupForgotAccountPassword(accountRepo, tokenGenerator)
  })

  it('should call accountRepo.find with correct params', async () => {
    await sut(input)

    expect(accountRepo.find).toHaveBeenCalledWith({ email: input.email })
    expect(accountRepo.find).toHaveBeenCalledTimes(1)
  })

  it('should throw UnauthorizedError when accountRepo.find returns no items', async () => {
    accountRepo.find.mockResolvedValueOnce({ items: 0, data: [] })

    const promise = sut(input)

    await expect(promise).rejects.toThrow(new UnauthorizedError('Invalid credentials.'))
  })

  it('should call tokenGenerator.generate with correct params', async () => {
    await sut(input)

    expect(tokenGenerator.generate).toHaveBeenCalledWith({
      key: {
        id: 'any_id',
        type: AccessTokenTypes.recover
      },
      expirationInMs: 1800000
    })
    expect(tokenGenerator.generate).toHaveBeenCalledTimes(1)
  })

  it('should return an recoverToken on success', async () => {
    const ForgotAccountPasswordResult = await sut(input)

    expect(ForgotAccountPasswordResult).toEqual({ recoverToken: 'any_token_string' })
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
