import { CurrentAccountController } from '@/main/controllers'
import { UnauthorizedError } from '@/application/errors'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { CurrentAccount } from '@/domain/use-cases'

describe('CurrentAccountController', () => {
  let input: CurrentAccount.Input
  let currentAccountService: jest.Mock
  let sut: CurrentAccountController

  beforeAll(() => {
    input = {
      accountId: 'any_id'
    }
    currentAccountService = jest.fn()
    currentAccountService.mockResolvedValue({
      name: 'any_name',
      email: 'any_email',
      phone: 'any_phone'
    })
  })

  beforeEach(() => {
    sut = new CurrentAccountController(currentAccountService)
  })

  it('should call currentAccountService with correct params', async () => {
    await sut.handle(input)

    expect(currentAccountService).toHaveBeenCalledWith(input)
    expect(currentAccountService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if currentAccountService fails', async () => {
    currentAccountService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(input)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if currentAccountService succeeds', async () => {
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
