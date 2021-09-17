import { GenerateRecoverTokenService } from '@/domain/use-cases'
import { AccessTokenTypes } from '@/main/types'
import { Token } from '@/data/contracts/crypto'
import { Repository as AccountDbRepo } from '@/data/contracts/repos'
import { UnauthorizedError } from '@/data/errors'

type setup = (
  accountRepo: AccountDbRepo,
  tokenGenerator: Token
) => GenerateRecoverTokenService

export const setupGenerateRecoverToken: setup = (accountRepo, tokenGenerator) => async ({ email }) => {
  const account = await accountRepo.find({ email })
  if (account.items !== 1) {
    throw new UnauthorizedError('Email doesn\'t exist.')
  }
  const recoverToken = await tokenGenerator.generate({ key: { id: account.data[0].id, type: AccessTokenTypes.recover }, expirationInMs: Number(process.env.TOKEN_EXPIRATION ?? 1800000) })
  return { recoverToken }
}
