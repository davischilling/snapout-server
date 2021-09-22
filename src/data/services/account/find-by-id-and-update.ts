import { FindAccountByIdAndUpdateService } from '@/domain/use-cases'
import { Repository as AccountDbRepo } from '@/data/contracts/repos'
import { Account } from '@/data/entities'

type setup = (
  accountRepo: AccountDbRepo
) => FindAccountByIdAndUpdateService

export const setupFindAccountByIdAndUpdate: setup = (accountRepo) => async params => {
  const account: Account = await accountRepo.findById(params.accountId)
  const updatedAccountEntity = new Account({ ...account, ...params })
  const { password, role, id, email, ...modifiedUpdatedAccountEntity } = updatedAccountEntity
  const updatedAccount = await accountRepo.findByIdAndUpdate(account.id as string, modifiedUpdatedAccountEntity)
  const { password: accountPassword, role: accountRole, ...modifiedUpdatedAccount } = updatedAccount
  return { ...modifiedUpdatedAccount }
}
