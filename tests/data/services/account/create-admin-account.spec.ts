import { CreateAdminAccount, CreateAdminAccountService } from '@/domain/use-cases'
import { setupCreateAdminAccount } from '@/data/services'
import { Repository as AccountDbRepo } from '@/data/contracts/repos'
import { Token } from '@/data/contracts/crypto'
import { UnauthorizedError } from '@/data/errors'
import { Account } from '@/data/entities'
import { AccessTokenTypes } from '@/main/types'

import { mock, MockProxy } from 'jest-mock-extended'
import { mocked } from 'ts-jest/utils'

jest.mock('@/data/entities/account')

describe('CreateAdminAccountService', () => {
  let accountRepo: MockProxy<AccountDbRepo>
  let tokenGenerator: MockProxy<Token>
  let account: CreateAdminAccount.Input
  let sut: CreateAdminAccountService

  beforeAll(() => {
    accountRepo = mock()
    accountRepo.find.mockResolvedValue({ items: 0, data: [] })
    accountRepo.create.mockResolvedValue('new_account_id')
    tokenGenerator = mock()
    tokenGenerator.generate.mockResolvedValue('any_token_string')
  })

  beforeEach(() => {
    account = {
      email: 'any_email'
    }
    sut = setupCreateAdminAccount(accountRepo, tokenGenerator)
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
      expirationInMs: 86400000
    })
    expect(tokenGenerator.generate).toHaveBeenCalledTimes(1)
  })

  it('should return an accessToken on success', async () => {
    const createAdminAccountResult = await sut(account)

    expect(createAdminAccountResult).toEqual({ accessToken: 'any_token_string' })
  })

  it('should rethrow if accountRepo.find throws', async () => {
    accountRepo.find.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut(account)

    await expect(promise).rejects.toThrow(new Error('repo_error'))
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
