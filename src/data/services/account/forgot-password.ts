import { ForgotAccountPasswordService } from '@/domain/use-cases'
import { AccessTokenTypes } from '@/main/types'
import { Token } from '@/data/contracts/crypto'
import { Repository as AccountDbRepo } from '@/data/contracts/repos'
import { UnauthorizedError } from '@/data/errors'

type setup = (
  accountRepo: AccountDbRepo,
  tokenGenerator: Token
) => ForgotAccountPasswordService

export const setupForgotAccountPassword: setup = (accountRepo, tokenGenerator) => async ({ email }) => {
  const accounts = await accountRepo.find({ email })
  if (accounts.items !== 1) {
    throw new UnauthorizedError('Invalid credentials.')
  }
  const recoverToken = await tokenGenerator.generate({ key: { id: accounts.data[0].id, type: AccessTokenTypes.recover }, expirationInMs: Number(process.env.TOKEN_EXPIRATION ?? 1800000) })
  return { recoverToken }
}
