import { UpdateAccountPasswordController } from '@/main/controllers'
import { UnauthorizedError } from '@/application/errors'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UpdateAccountPassword } from '@/domain/use-cases'

describe('UpdateAccountPasswordController', () => {
  let input: UpdateAccountPassword.Input
  let updateAccountPasswordService: jest.Mock
  let sut: UpdateAccountPasswordController

  beforeAll(() => {
    input = {
      accountId: 'any_id',
      old_password: 'old_password',
      password: 'any_password',
      repeat_password: 'any_password'
    }
    updateAccountPasswordService = jest.fn()
    updateAccountPasswordService.mockResolvedValue({
      name: 'any_name',
      email: 'any_email',
      phone: 'any_phone'
    })
  })

  beforeEach(() => {
    sut = new UpdateAccountPasswordController(updateAccountPasswordService)
  })

  it('should call updateAccountPasswordService with correct params', async () => {
    await sut.handle(input)

    expect(updateAccountPasswordService).toHaveBeenCalledWith(input)
    expect(updateAccountPasswordService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if updateAccountPasswordService fails', async () => {
    updateAccountPasswordService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(input)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if updateAccountPasswordService succeeds', async () => {
    const httpResponse = await sut.handle(input)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        name: 'any_name',
        email: 'any_email',
        phone: 'any_phone'
      }
    })
  })
})
