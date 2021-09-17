import { OperatorAuthenticationMiddleware } from '@/application/middlewares'
import { Repository as AccountDbRepo } from '@/data/contracts/repos'
import { ForbiddenError } from '@/application/errors'
import { AccessTokenTypes } from '@/main/types'
import { AccountData, RoleType } from '@/domain/models'

import { mock, MockProxy } from 'jest-mock-extended'

describe('OperatorAuthenticationMiddleware', () => {
  let authorization: string
  let account: AccountData
  let role: string[]
  let type: AccessTokenTypes
  let authorize: jest.Mock
  let accountRepo: MockProxy<AccountDbRepo>
  let sut: OperatorAuthenticationMiddleware

  beforeAll(() => {
    accountRepo = mock()
  })

  beforeEach(() => {
    type = AccessTokenTypes.access
    role = [RoleType.operator, RoleType.admin]
    authorization = 'any_authorization_token'
    account = {
      id: 'any_account_id',
      email: 'any_email',
      password: 'any_password',
      role: RoleType.operator
    }
    accountRepo.findById.mockResolvedValue(account)
    authorize = jest.fn().mockResolvedValue({ id: 'any_account_id', type })
    sut = new OperatorAuthenticationMiddleware(authorize, accountRepo, role, type)
  })

  it('should return 403 if authorization is empty', async () => {
    const httpResponse = await sut.handle({ authorization: '' })

    expect(httpResponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError()
    })
  })

  it('should return 403 if authorization is null', async () => {
    const httpResponse = await sut.handle({ authorization: null as any })

    expect(httpResponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError()
    })
  })

  it('should return 403 if authorization is undefined', async () => {
    const httpResponse = await sut.handle({ authorization: undefined as any })

    expect(httpResponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError()
    })
  })

  it('should call authorize with correct params', async () => {
    await sut.handle({ authorization })

    expect(authorize).toHaveBeenCalledWith({ token: authorization })
    expect(authorize).toHaveBeenCalledTimes(1)
  })

  it('should return 403 if authorize throws', async () => {
    authorize.mockRejectedValueOnce(new Error('any_error'))

    const httpResponse = await sut.handle({ authorization })

    expect(httpResponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError()
    })
  })

  it('should return 403 if the access token returned by authorize is different', async () => {
    authorize = jest.fn().mockResolvedValueOnce({ id: 'any_account_id', token: AccessTokenTypes.recover })
    sut = new OperatorAuthenticationMiddleware(authorize, accountRepo, role, AccessTokenTypes.access)

    const httpResponse = await sut.handle({ authorization })

    expect(httpResponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError()
    })
  })

  it('should call accountRepo.findById with correct params', async () => {
    await sut.handle({ authorization })

    expect(accountRepo.findById).toHaveBeenCalledWith('any_account_id')
    expect(accountRepo.findById).toHaveBeenCalledTimes(1)
  })

  it('should return 403 if the returned account role doesn\'t match', async () => {
    role.shift()

    const httpResponse = await sut.handle({ authorization })

    expect(httpResponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError()
    })
  })

  it('should return 200 with accountId on success', async () => {
    const httpResponse = await sut.handle({ authorization })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { accountId: 'any_account_id' }
    })
  })
})
