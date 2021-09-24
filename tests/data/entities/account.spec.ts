/* eslint-disable @typescript-eslint/no-unused-vars */

import { Account } from '@/data/entities'
import { AccountData } from '@/domain/models'
import { UnauthorizedError } from '@/data/errors'

describe('Account', () => {
  let accountData: AccountData
  let sut: Account

  beforeEach(() => {
    accountData = {
      name: 'any_name',
      phone: 'any_phone',
      email: 'any_email',
      password: 'any_password'
    }
  })

  it('should fill the attrs on the constructor with correct params', () => {
    sut = new Account(accountData)

    expect(sut).toEqual(accountData)
  })

  it('should update the account correctly', () => {
    sut = new Account(accountData)
    sut.id = 'any_account_id'

    const updatedAccount = new Account({ ...sut, ...{ password: 'new_password' } })
    sut.password = 'new_password'

    expect(updatedAccount).toEqual(sut)
  })
})
