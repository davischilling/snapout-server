import { UnauthorizedError } from '@/application/errors'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { SignUp } from '@/domain/use-cases'
import { SignUpController } from '@/main/controllers'

describe('SignUpController', () => {
  let account: SignUp.Input
  let signUpService: jest.Mock
  let sut: SignUpController

  beforeAll(() => {
    signUpService = jest.fn()
    signUpService.mockResolvedValue({ accessToken: 'any_access_token' })
  })

  beforeEach(() => {
    account = {
      name: 'any_name',
      phone: 'any_phone',
      email: 'any_email',
      password: 'any_password',
      repeat_password: 'any_password'
    }
    sut = new SignUpController(signUpService)
  })

  it('should call signUpService with correct params', async () => {
    await sut.handle(account)

    expect(signUpService).toHaveBeenCalledWith(account)
    expect(signUpService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if signUpService fails', async () => {
    signUpService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(account)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 201 if signUpService succeeds', async () => {
    const httpResponse = await sut.handle(account)

    expect(httpResponse).toEqual({
      statusCode: 201,
      data: { accessToken: 'any_access_token' }
    })
  })
})
