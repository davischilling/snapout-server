import { UnauthorizedError } from '@/application/errors'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { GenerateRecoverToken } from '@/domain/use-cases'
import { GenerateRecoverTokenController } from '@/main/controllers'

describe('GenerateRecoverTokenController', () => {
  let input: GenerateRecoverToken.Input
  let generateRecoverTokenService: jest.Mock
  let sut: GenerateRecoverTokenController

  beforeAll(() => {
    input = {
      email: 'any_email'
    }
    generateRecoverTokenService = jest.fn()
    generateRecoverTokenService.mockResolvedValue({ recoverToken: 'any_recover_token' })
  })

  beforeEach(() => {
    sut = new GenerateRecoverTokenController(generateRecoverTokenService)
  })

  it('should call generateRecoverTokenService with correct params', async () => {
    await sut.handle(input)

    expect(generateRecoverTokenService).toHaveBeenCalledWith(input)
    expect(generateRecoverTokenService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if generateRecoverTokenService fails', async () => {
    generateRecoverTokenService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(input)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if generateRecoverTokenService succeeds', async () => {
    const httpResponse = await sut.handle(input)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { recoverToken: 'any_recover_token' }
    })
  })
})
