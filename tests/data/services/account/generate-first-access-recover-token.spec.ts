import { AccessTokenTypes } from '@/main/types'
import { Token } from '@/data/contracts/crypto'
import { Repository as AccountDbRepo } from '@/data/contracts/repos'
import { Account } from '@/data/entities'
import { UnauthorizedError } from '@/data/errors'
import { setupGenerateFirstAccessRecoverToken } from '@/data/services'
import { GenerateFirstAccessRecoverToken, GenerateFirstAccessRecoverTokenService } from '@/domain/use-cases'

import { mock, MockProxy } from 'jest-mock-extended'
import { mocked } from 'ts-jest/utils'

jest.mock('@/data/entities/account')

describe('GenerateFirstAccessRecoverTokenService', () => {
  let accountRepo: MockProxy<AccountDbRepo>
  let tokenGenerator: MockProxy<Token>
  let input: GenerateFirstAccessRecoverToken.Input
  let sut: GenerateFirstAccessRecoverTokenService

  beforeAll(() => {
    accountRepo = mock()
    accountRepo.find.mockResolvedValue({ items: 0, data: [] })
    accountRepo.create.mockResolvedValue('new_account_id')
    tokenGenerator = mock()
    tokenGenerator.generate.mockResolvedValue('any_token_string')
  })

  beforeEach(() => {
    input = {
      email: 'any_email'
    }
    sut = setupGenerateFirstAccessRecoverToken(accountRepo, tokenGenerator)
  })

  it('should call accountRepo.find with correct params', async () => {
    await sut(input)

    expect(accountRepo.find).toHaveBeenCalledWith({ email: input.email })
    expect(accountRepo.find).toHaveBeenCalledTimes(1)
  })

  it('should throw UnauthorizedError when accountRepo.find returns any items', async () => {
    accountRepo.find.mockResolvedValueOnce({ items: 1, data: [] })

    const promise = sut(input)

    await expect(promise).rejects.toThrow(new UnauthorizedError('Email already in use.'))
  })

  it('should call accountRepo.create with the instaciated Account entity', async () => {
    const AccountStub = jest.fn().mockImplementation(() => ({ any: 'any' }))
    mocked(Account).mockImplementation(AccountStub)

    await sut(input)

    expect(accountRepo.create).toHaveBeenCalledWith({ any: 'any' })
    expect(accountRepo.create).toHaveBeenCalledTimes(1)
  })

  it('should call tokenGenerator.generate with correct params', async () => {
    await sut(input)

    expect(tokenGenerator.generate).toHaveBeenCalledWith({
      key: {
        id: 'new_account_id',
        type: AccessTokenTypes.recover
      },
      expirationInMs: 1800000
    })
    expect(tokenGenerator.generate).toHaveBeenCalledTimes(1)
  })

  it('should return an recoverToken on success', async () => {
    const GenerateFirstAccessRecoverTokenResult = await sut(input)

    expect(GenerateFirstAccessRecoverTokenResult).toEqual({ recoverToken: 'any_token_string' })
  })

  it('should rethrow if accountRepo.find throws', async () => {
    accountRepo.find.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut(input)

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })

  it('should rethrow if accountRepo.create throws', async () => {
    accountRepo.create.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut(input)

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })

  it('should rethrow if tokenGenerator.generate throws', async () => {
    tokenGenerator.generate.mockRejectedValueOnce(new Error('generate_error'))

    const promise = sut(input)

    await expect(promise).rejects.toThrow(new Error('generate_error'))
  })
})
