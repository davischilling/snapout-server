import { CreateAdminAccountService } from '@/domain/use-cases'
import { AccessTokenTypes } from '@/main/types'
import { Token } from '@/data/contracts/crypto'
import { Repository as AccountDbRepo } from '@/data/contracts/repos'
import { Account } from '@/data/entities'
import { UnauthorizedError } from '@/data/errors'
import { RoleType } from '@/domain/models'

type setup = (
  accountRepo: AccountDbRepo,
  tokenGenerator: Token
) => CreateAdminAccountService

export const setupCreateAdminAccount: setup = (accountRepo, tokenGenerator) => async ({ email }) => {
  const account = await accountRepo.find({ email })
  if (account.items === 1) {
    throw new UnauthorizedError('Invalid credentials.')
  }
  const newAdminAccount = new Account({ email, role: RoleType.admin })
  const id = await accountRepo.create(newAdminAccount)
  const accessToken = await tokenGenerator.generate({ key: { id, type: AccessTokenTypes.access }, expirationInMs: Number(process.env.ADMIN_TOKEN_EXPIRATION ?? 86400000) })
  return { accessToken }
}
