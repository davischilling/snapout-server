import { CurrentAccountService } from '@/domain/use-cases'
import { Repository as AccountDbRepo } from '@/data/contracts/repos'

type setup = (
  accountRepo: AccountDbRepo
) => CurrentAccountService

export const setupCurrentAccount: setup = (accountRepo) => async ({ accountId }) => {
  const account = await accountRepo.findById(accountId)
  const { password, role, ...currentAccount } = account
  return { ...currentAccount }
}
