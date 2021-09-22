import { FindSectionsController } from '@/main/controllers'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

describe('FindSectionsController', () => {
  let findSectionsService: jest.Mock
  let sut: FindSectionsController

  beforeAll(() => {
    findSectionsService = jest.fn()
    findSectionsService.mockResolvedValue({ items: 0, data: [] })
  })

  beforeEach(() => {
    sut = new FindSectionsController(findSectionsService)
  })

  it('should call findSectionsService with correct params', async () => {
    await sut.handle({ data: 'any' })

    expect(findSectionsService).toHaveBeenCalledWith({ data: 'any' })
    expect(findSectionsService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findSectionsService fails', async () => {
    findSectionsService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle({ data: 'any' })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findSectionsService succeeds', async () => {
    const httpResponse = await sut.handle({ data: 'any' })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { items: 0, data: [] }
    })
  })
})
