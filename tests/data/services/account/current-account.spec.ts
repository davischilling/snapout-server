import { CurrentAccount, CurrentAccountService } from '@/domain/use-cases'
import { setupCurrentAccount } from '@/data/services'
import { Repository as AccountDbRepo } from '@/data/contracts/repos'

import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/account')

describe('CurrentAccountService', () => {
  let accountRepo: MockProxy<AccountDbRepo>
  let account: CurrentAccount.Input
  let sut: CurrentAccountService

  beforeAll(() => {
    accountRepo = mock()
    accountRepo.findById.mockResolvedValue({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      phone: 'any_phone',
      role: 'any_role',
      password: 'any_password'
    })
  })

  beforeEach(() => {
    account = {
      accountId: 'any_id'
    }
    sut = setupCurrentAccount(accountRepo)
  })

  it('should call accountRepo.findById with correct params', async () => {
    await sut(account)

    expect(accountRepo.findById).toHaveBeenCalledWith('any_id')
    expect(accountRepo.findById).toHaveBeenCalledTimes(1)
  })

  it('should return an account without password and role on success', async () => {
    const currentAccountResult = await sut(account)

    expect(currentAccountResult).toEqual({ name: 'any_name', email: 'any_email', phone: 'any_phone', id: 'any_id' })
  })

  it('should rethrow if accountRepo.findById throws', async () => {
    accountRepo.findById.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut(account)

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })
})
