import { UnauthorizedError } from '@/application/errors'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { RecoverAccountPassword } from '@/domain/use-cases'
import { RecoverAccountPasswordController } from '@/main/controllers'

describe('RecoverAccountPasswordController', () => {
  let input: RecoverAccountPassword.Input
  let recoverAccountPasswordService: jest.Mock
  let sut: RecoverAccountPasswordController

  beforeAll(() => {
    input = {
      accountId: 'any_id',
      password: 'any_password',
      repeat_password: 'any_password'
    }
    recoverAccountPasswordService = jest.fn()
    recoverAccountPasswordService.mockResolvedValue({ accessToken: 'any_access_token' })
  })

  beforeEach(() => {
    sut = new RecoverAccountPasswordController(recoverAccountPasswordService)
  })

  it('should call recoverAccountPasswordService with correct params', async () => {
    await sut.handle(input)

    expect(recoverAccountPasswordService).toHaveBeenCalledWith(input)
    expect(recoverAccountPasswordService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if recoverAccountPasswordService fails', async () => {
    recoverAccountPasswordService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(input)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if recoverAccountPasswordService succeeds', async () => {
    const httpResponse = await sut.handle(input)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { accessToken: 'any_access_token' }
    })
  })
})
