import { UnauthorizedError } from '@/application/errors'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { SignInAdminAccount } from '@/domain/use-cases'
import { SignInAdminAccountController } from '@/main/controllers'

describe('SignInAdminAccountController', () => {
  let input: SignInAdminAccount.Input
  let signInAdminAccountService: jest.Mock
  let sut: SignInAdminAccountController

  beforeAll(() => {
    input = {
      email: 'any_email'
    }
    signInAdminAccountService = jest.fn()
    signInAdminAccountService.mockResolvedValue({ accessToken: 'any_access_token' })
  })

  beforeEach(() => {
    sut = new SignInAdminAccountController(signInAdminAccountService)
  })

  it('should call signInAdminAccountService with correct params', async () => {
    await sut.handle(input)

    expect(signInAdminAccountService).toHaveBeenCalledWith(input)
    expect(signInAdminAccountService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if signInAdminAccountService fails', async () => {
    signInAdminAccountService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(input)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if signInAdminAccountService succeeds', async () => {
    const httpResponse = await sut.handle(input)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { accessToken: 'any_access_token' }
    })
  })
})
