import { UpdateAccountPasswordService } from '@/domain/use-cases'
import { Repository as AccountDbRepo } from '@/data/contracts/repos'
import { Account } from '@/data/entities'
import { UnauthorizedError } from '@/data/errors'
import { Encripter } from '@/data/contracts/crypto'

type setup = (
  accountRepo: AccountDbRepo,
  encripter: Encripter
) => UpdateAccountPasswordService

export const setupUpdateAccountPassword: setup = (accountRepo, encripter) => async params => {
  const {
    accountId,
    old_password,
    password,
    repeat_password
  } = params
  const account: Account = await accountRepo.findById(accountId)
  if (
    password !== repeat_password || (!await encripter
      .compare({
        storedPassword: account.password as string,
        suppliedPassword: old_password
      }))
  ) {
    throw new UnauthorizedError('Invalid credentials.')
  }
  const hashedPassword = await encripter.toHash(password)
  const updatedAccount = await accountRepo.findByIdAndUpdate(account.id as string, { password: hashedPassword })
  const { password: accountPassword, role, ...modifiedUpdatedAccount } = updatedAccount
  return modifiedUpdatedAccount
}
