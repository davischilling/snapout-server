import { FindParagraphsController } from '@/main/controllers'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

describe('FindParagraphsController', () => {
  let findParagraphsService: jest.Mock
  let sut: FindParagraphsController

  beforeAll(() => {
    findParagraphsService = jest.fn()
    findParagraphsService.mockResolvedValue({ items: 0, data: [] })
  })

  beforeEach(() => {
    sut = new FindParagraphsController(findParagraphsService)
  })

  it('should call findParagraphsService with correct params', async () => {
    await sut.handle({ data: 'any' })

    expect(findParagraphsService).toHaveBeenCalledWith({ data: 'any' })
    expect(findParagraphsService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findParagraphsService fails', async () => {
    findParagraphsService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle({ data: 'any' })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findParagraphsService succeeds', async () => {
    const httpResponse = await sut.handle({ data: 'any' })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { items: 0, data: [] }
    })
  })
})
