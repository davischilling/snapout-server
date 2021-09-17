import { AccessTokenTypes } from '@/main/types'
import { Token, Encripter } from '@/data/contracts/crypto'
import { Repository as AccountDbRepo } from '@/data/contracts/repos'
import { Account } from '@/data/entities'
import { UnauthorizedError } from '@/data/errors'
import { RecoverAccountPasswordService } from '@/domain/use-cases'

type setup = (
  accountRepo: AccountDbRepo,
  encripter: Encripter,
  tokenGenerator: Token
) => RecoverAccountPasswordService

export const setupRecoverAccountPassword: setup = (accountRepo, encripter, tokenGenerator) => async params => {
  const {
    accountId,
    password,
    repeat_password
  } = params
  if (password !== repeat_password) {
    throw new UnauthorizedError('Invalid credentials.')
  }
  const account: Account = await accountRepo.findById(accountId)
  const hashedPassword = await encripter.toHash(password)
  await accountRepo.findByIdAndUpdate(account.id as string, { password: hashedPassword })
  const accessToken = await tokenGenerator.generate({ key: { id: accountId, type: AccessTokenTypes.access }, expirationInMs: Number(process.env.TOKEN_EXPIRATION ?? 1800000) })
  return { accessToken }
}
