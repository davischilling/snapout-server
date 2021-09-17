import { UnauthorizedError } from '@/application/errors'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { CreateAdminAccount } from '@/domain/use-cases'
import { CreateAdminAccountController } from '@/main/controllers'

describe('CreateAdminAccountController', () => {
  let input: CreateAdminAccount.Input
  let createAdminAccountService: jest.Mock
  let sut: CreateAdminAccountController

  beforeAll(() => {
    input = {
      email: 'any_email'
    }
    createAdminAccountService = jest.fn()
    createAdminAccountService.mockResolvedValue({ accessToken: 'any_access_token' })
  })

  beforeEach(() => {
    sut = new CreateAdminAccountController(createAdminAccountService)
  })

  it('should call createAdminAccountService with correct params', async () => {
    await sut.handle(input)

    expect(createAdminAccountService).toHaveBeenCalledWith(input)
    expect(createAdminAccountService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if createAdminAccountService fails', async () => {
    createAdminAccountService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(input)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 201 if createAdminAccountService succeeds', async () => {
    const httpResponse = await sut.handle(input)

    expect(httpResponse).toEqual({
      statusCode: 201,
      data: { accessToken: 'any_access_token' }
    })
  })
})
