import { FindAccountByIdAndUpdateController } from '@/main/controllers'
import { UnauthorizedError } from '@/application/errors'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { FindAccountByIdAndUpdate } from '@/domain/use-cases'

describe('FindAccountByIdAndUpdateController', () => {
  let input: FindAccountByIdAndUpdate.Input
  let findAccountByIdAndUpdateService: jest.Mock
  let sut: FindAccountByIdAndUpdateController

  beforeAll(() => {
    input = {
      accountId: 'any_id'
    }
    findAccountByIdAndUpdateService = jest.fn()
    findAccountByIdAndUpdateService.mockResolvedValue({
      name: 'any_name',
      email: 'any_email',
      phone: 'any_phone'
    })
  })

  beforeEach(() => {
    sut = new FindAccountByIdAndUpdateController(findAccountByIdAndUpdateService)
  })

  it('should call findAccountByIdAndUpdateService with correct params', async () => {
    await sut.handle(input)

    expect(findAccountByIdAndUpdateService).toHaveBeenCalledWith(input)
    expect(findAccountByIdAndUpdateService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findAccountByIdAndUpdateService fails', async () => {
    findAccountByIdAndUpdateService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(input)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findAccountByIdAndUpdateService succeeds', async () => {
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
