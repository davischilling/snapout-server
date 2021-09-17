import { AccountAttrs, AccountEntity as AccountRepoModel } from '@/infra/mongodb/entities'
import { AccountData } from '@/domain/models'
import { Account } from '@/data/entities'

import { sign } from 'jsonwebtoken'
import { AccessTokenTypes } from '@/main/types'

export const makeNewAccount = async (account: AccountData): Promise<string> => {
  const accountAttrs: AccountAttrs = new Account(account)
  const newAccount = AccountRepoModel.build(accountAttrs)
  const saved = await newAccount.save()
  return saved._id.toString()
}

export const signIn = (id: string): string => {
  return sign({ key: { id, type: AccessTokenTypes.access } }, 'secret', { expiresIn: 1800000 })
}

export const signUpSetup = async (params: AccountData): Promise<{
  id: string
  accessToken: string
}> => {
  const accountId = await makeNewAccount(params)
  const accessToken = signIn(accountId)
  return {
    id: accountId,
    accessToken
  }
}
