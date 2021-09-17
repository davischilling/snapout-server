import { SignInService } from '@/domain/use-cases'
import { Repository as AccountDbRepo } from '@/data/contracts/repos'
import { Encripter, Token } from '@/data/contracts/crypto'
import { UnauthorizedError } from '@/data/errors'
import { AccessTokenTypes } from '@/main/types'

type setup = (
  accountRepo: AccountDbRepo,
  encripter: Encripter,
  tokenGenerator: Token
) => SignInService

export const setupSignIn: setup = (accountRepo, encripter, tokenGenerator) => async ({
  email,
  password
}) => {
  const account = await accountRepo.find({ email })
  if (account.items !== 1) {
    throw new UnauthorizedError('Invalid credentials.')
  }
  const { id, password: accountPassword } = account.data[0]
  const passwordMatch = await encripter.compare({ storedPassword: accountPassword, suppliedPassword: password })
  if (!passwordMatch) {
    throw new UnauthorizedError('Invalid credentials.')
  }
  const accessToken = await tokenGenerator.generate({ key: { id, type: AccessTokenTypes.access }, expirationInMs: Number(process.env.TOKEN_EXPIRATION ?? 1800000) })
  return { accessToken }
}
