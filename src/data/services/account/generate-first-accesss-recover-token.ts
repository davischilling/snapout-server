import { GenerateFirstAccessRecoverTokenService } from '@/domain/use-cases'
import { AccessTokenTypes } from '@/main/types'
import { Token } from '@/data/contracts/crypto'
import { Repository as AccountDbRepo } from '@/data/contracts/repos'
import { Account } from '@/data/entities'
import { UnauthorizedError } from '@/data/errors'

type setup = (
  accountRepo: AccountDbRepo,
  tokenGenerator: Token
) => GenerateFirstAccessRecoverTokenService

export const setupGenerateFirstAccessRecoverToken: setup = (accountRepo, tokenGenerator) => async ({ email }) => {
  const account = await accountRepo.find({ email })
  if (account.items === 1) {
    throw new UnauthorizedError('Email already in use.')
  }
  const newAccount = new Account({ email })
  const id = await accountRepo.create(newAccount)
  const recoverToken = await tokenGenerator.generate({ key: { id, type: AccessTokenTypes.recover }, expirationInMs: Number(process.env.TOKEN_EXPIRATION ?? 1800000) })
  return { recoverToken }
}
