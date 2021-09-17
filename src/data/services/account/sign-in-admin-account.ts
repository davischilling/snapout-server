import { AccessTokenTypes } from '@/main/types'
import { Token } from '@/data/contracts/crypto'
import { Repository as AccountDbRepo } from '@/data/contracts/repos'
import { UnauthorizedError } from '@/data/errors'
import { RoleType } from '@/domain/models'
import { SignInAdminAccountService } from '@/domain/use-cases'

type setup = (
  accountRepo: AccountDbRepo,
  tokenGenerator: Token
) => SignInAdminAccountService

export const setupSignInAdminAccount: setup = (accountRepo, tokenGenerator) => async ({ email }) => {
  const account = await accountRepo.find({ email })
  if (account.items !== 1) {
    throw new UnauthorizedError('Email doesn\t exist.')
  } else if (account.data[0].role !== RoleType.admin) {
    throw new UnauthorizedError('Account is not an administrator.')
  }
  const accessToken = await tokenGenerator.generate({ key: { id: account.data[0].id, type: AccessTokenTypes.access }, expirationInMs: Number(process.env.ADMIN_TOKEN_EXPIRATION ?? 86400000) })
  return { accessToken }
}
