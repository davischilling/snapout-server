import { FindMembersController } from '@/main/controllers'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

describe('FindMembersController', () => {
  let findMembersService: jest.Mock
  let sut: FindMembersController

  beforeAll(() => {
    findMembersService = jest.fn()
    findMembersService.mockResolvedValue({ items: 0, data: [] })
  })

  beforeEach(() => {
    sut = new FindMembersController(findMembersService)
  })

  it('should call findMembersService with correct params', async () => {
    await sut.handle({ data: 'any' })

    expect(findMembersService).toHaveBeenCalledWith({ data: 'any' })
    expect(findMembersService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findMembersService fails', async () => {
    findMembersService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle({ data: 'any' })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findMembersService succeeds', async () => {
    const httpResponse = await sut.handle({ data: 'any' })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { items: 0, data: [] }
    })
  })
})
