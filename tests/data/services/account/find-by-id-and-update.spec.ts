import { FindAccountByIdAndUpdate, FindAccountByIdAndUpdateService } from '@/domain/use-cases'
import { setupFindAccountByIdAndUpdate } from '@/data/services'
import { Repository as AccountDbRepo } from '@/data/contracts/repos'
import { AccountData, RoleType } from '@/domain/models'
import { Account } from '@/data/entities'

import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/account')

describe('FindAccountByIdAndUpdateService', () => {
  let accountRepo: MockProxy<AccountDbRepo>
  let input: FindAccountByIdAndUpdate.Input
  let account: AccountData
  let mockUpdatedAccount: Account
  let spyAccount: any
  let sut: FindAccountByIdAndUpdateService

  beforeAll(() => {
    input = {
      accountId: 'any_account_id',
      name: 'another_name',
      phone: 'another_phone'
    }
    account = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      phone: 'any_phone',
      role: RoleType.operator,
      password: 'any_password'
    }
    accountRepo = mock()
    accountRepo.findById.mockResolvedValue(account)
    mockUpdatedAccount = new Account(account)
    spyAccount = jest.spyOn(Account, 'update').mockReturnValue(mockUpdatedAccount)
    accountRepo.findByIdAndUpdate.mockResolvedValue(account)
  })

  beforeEach(() => {
    sut = setupFindAccountByIdAndUpdate(accountRepo)
  })

  it('should call accountRepo.findById with correct params', async () => {
    await sut(input)

    expect(accountRepo.findById).toHaveBeenCalledWith('any_account_id')
    expect(accountRepo.findById).toHaveBeenCalledTimes(1)
  })

  it('should call Account entity update method with correct params', async () => {
    await sut(input)

    expect(spyAccount).toHaveBeenCalledWith(account, input)
    expect(spyAccount).toHaveBeenCalledTimes(1)
  })

  it('should call AccountRepo.findByIdAndUpdate with correct params', async () => {
    await sut(input)

    expect(accountRepo.findByIdAndUpdate).toHaveBeenCalledWith('any_id', mockUpdatedAccount)
    expect(accountRepo.findByIdAndUpdate).toHaveBeenCalledTimes(1)
  })

  it('should return an updated account without password and role on success', async () => {
    const findAccountByIdAndUpdateResult = await sut(input)

    expect(findAccountByIdAndUpdateResult).toEqual({ id: 'any_id', name: 'any_name', email: 'any_email', phone: 'any_phone' })
  })

  it('should rethrow if accountRepo.findById throws', async () => {
    accountRepo.findById.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut(input)

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })

  it('should rethrow if accountRepo.findByIdAndUpdate throws', async () => {
    accountRepo.findByIdAndUpdate.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut(input)

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })
})
