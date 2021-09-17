import { FindUsersController } from '@/main/controllers'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

describe('FindUsersController', () => {
  let findUsersService: jest.Mock
  let sut: FindUsersController

  beforeAll(() => {
    findUsersService = jest.fn()
    findUsersService.mockResolvedValue({ items: 0, data: [] })
  })

  beforeEach(() => {
    sut = new FindUsersController(findUsersService)
  })

  it('should call findUsersService with correct params', async () => {
    await sut.handle({ data: 'any' })

    expect(findUsersService).toHaveBeenCalledWith({ data: 'any' })
    expect(findUsersService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findUsersService fails', async () => {
    findUsersService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle({ data: 'any' })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findUsersService succeeds', async () => {
    const httpResponse = await sut.handle({ data: 'any' })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { items: 0, data: [] }
    })
  })
})
