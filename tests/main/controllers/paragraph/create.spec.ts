import { UnauthorizedError } from '@/application/errors'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { CreateParagraph } from '@/domain/use-cases'
import { CreateParagraphController } from '@/main/controllers'

describe('CreateParagraphController', () => {
  let paragraphData: CreateParagraph.Input
  let createParagraph: jest.Mock
  let sut: CreateParagraphController

  beforeAll(() => {
    paragraphData = {
      paragraph: 'any_paragraph'
    }
    createParagraph = jest.fn()
    createParagraph.mockResolvedValue({ id: 'paragraph_id' })
  })

  beforeEach(() => {
    sut = new CreateParagraphController(createParagraph)
  })

  it('should call createParagraph with correct params', async () => {
    await sut.handle(paragraphData)

    expect(createParagraph).toHaveBeenCalledWith(paragraphData)
    expect(createParagraph).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if createParagraph fails', async () => {
    createParagraph.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(paragraphData)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 201 if createParagraph succeeds', async () => {
    const httpResponse = await sut.handle(paragraphData)

    expect(httpResponse).toEqual({
      statusCode: 201,
      data: {
        id: 'paragraph_id'
      }
    })
  })
})
