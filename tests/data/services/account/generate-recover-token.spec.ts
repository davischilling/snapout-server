import { AccessTokenTypes } from '@/main/types'
import { Token } from '@/data/contracts/crypto'
import { Repository as AccountDbRepo } from '@/data/contracts/repos'
import { UnauthorizedError } from '@/data/errors'
import { setupGenerateRecoverToken } from '@/data/services'
import { GenerateRecoverToken, GenerateRecoverTokenService } from '@/domain/use-cases'

import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/account')

describe('GenerateRecoverTokenService', () => {
  let accountRepo: MockProxy<AccountDbRepo>
  let tokenGenerator: MockProxy<Token>
  let input: GenerateRecoverToken.Input
  let sut: GenerateRecoverTokenService

  beforeAll(() => {
    accountRepo = mock()
    accountRepo.find.mockResolvedValue({
      items: 1,
      data: [{
        id: 'new_account_id',
        accountData: 'any_account_data'
      }]
    })
    tokenGenerator = mock()
    tokenGenerator.generate.mockResolvedValue('any_token_string')
  })

  beforeEach(() => {
    input = {
      email: 'any_email'
    }
    sut = setupGenerateRecoverToken(accountRepo, tokenGenerator)
  })

  it('should call accountRepo.find with correct params', async () => {
    await sut(input)

    expect(accountRepo.find).toHaveBeenCalledWith({ email: input.email })
    expect(accountRepo.find).toHaveBeenCalledTimes(1)
  })

  it('should throw UnauthorizedError when accountRepo.find returns items is 0', async () => {
    accountRepo.find.mockResolvedValueOnce({ items: 0, data: [] })

    const promise = sut(input)

    await expect(promise).rejects.toThrow(new UnauthorizedError('Email doesn\'t exist.'))
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
    const GenerateRecoverTokenResult = await sut(input)

    expect(GenerateRecoverTokenResult).toEqual({ recoverToken: 'any_token_string' })
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
