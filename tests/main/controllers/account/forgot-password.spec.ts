import { UnauthorizedError } from '@/application/errors'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { ForgotAccountPassword } from '@/domain/use-cases'
import { ForgotAccountPasswordController } from '@/main/controllers'

describe('ForgotAccountPasswordController', () => {
  let input: ForgotAccountPassword.Input
  let forgotAccountPasswordService: jest.Mock
  let sut: ForgotAccountPasswordController

  beforeAll(() => {
    input = {
      email: 'any_email'
    }
    forgotAccountPasswordService = jest.fn()
    forgotAccountPasswordService.mockResolvedValue({ recoverToken: 'any_recover_token' })
  })

  beforeEach(() => {
    sut = new ForgotAccountPasswordController(forgotAccountPasswordService)
  })

  it('should call forgotAccountPasswordService with correct params', async () => {
    await sut.handle(input)

    expect(forgotAccountPasswordService).toHaveBeenCalledWith(input)
    expect(forgotAccountPasswordService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if forgotAccountPasswordService fails', async () => {
    forgotAccountPasswordService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(input)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if forgotAccountPasswordService succeeds', async () => {
    const httpResponse = await sut.handle(input)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { recoverToken: 'any_recover_token' }
    })
  })
})
