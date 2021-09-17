import { UnauthorizedError } from '@/application/errors'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { SignIn } from '@/domain/use-cases'
import { SignInController } from '@/main/controllers'

describe('SignInController', () => {
  let account: SignIn.Input
  let signInService: jest.Mock
  let sut: SignInController

  beforeAll(() => {
    signInService = jest.fn()
    signInService.mockResolvedValue({ accessToken: 'any_access_token' })
  })

  beforeEach(() => {
    account = {
      email: 'any_email',
      password: 'any_password'
    }
    sut = new SignInController(signInService)
  })

  it('should call signInService with correct params', async () => {
    await sut.handle(account)

    expect(signInService).toHaveBeenCalledWith(account)
    expect(signInService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if signInService fails', async () => {
    signInService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(account)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if signInService succeeds', async () => {
    const httpResponse = await sut.handle(account)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { accessToken: 'any_access_token' }
    })
  })
})
