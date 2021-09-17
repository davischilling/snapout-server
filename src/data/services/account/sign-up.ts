import { SignUpService } from '@/domain/use-cases'
import { Repository as AccountDbRepo } from '@/data/contracts/repos'
import { Encripter, Token } from '@/data/contracts/crypto'
import { UnauthorizedError } from '@/data/errors'
import { Account } from '@/data/entities'
import { AccessTokenTypes } from '@/main/types'

type setup = (
  accountRepo: AccountDbRepo,
  encripter: Encripter,
  tokenGenerator: Token
) => SignUpService

export const setupSignUp: setup = (accountRepo, encripter, tokenGenerator) => async ({
  email,
  password,
  repeat_password,
  phone,
  name
}) => {
  if (password !== repeat_password) {
    throw new UnauthorizedError('Invalid credentials.')
  }
  const account = await accountRepo.find({ email })
  if (account.items !== 0) {
    throw new UnauthorizedError('Invalid credentials.')
  }
  const hashedPassword = await encripter.toHash(password)
  const newAccount = new Account({ phone, name, email, password: hashedPassword })
  const id = await accountRepo.create(newAccount)
  const accessToken = await tokenGenerator.generate({ key: { id, type: AccessTokenTypes.access }, expirationInMs: Number(process.env.TOKEN_EXPIRATION ?? 1800000) })
  return { accessToken }
}
