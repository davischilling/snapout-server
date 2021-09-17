import { UnauthorizedError } from '@/application/errors'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { GenerateFirstAccessRecoverToken } from '@/domain/use-cases'
import { GenerateFirstAccessRecoverTokenController } from '@/main/controllers'

describe('GenerateFirstAccessRecoverTokenController', () => {
  let input: GenerateFirstAccessRecoverToken.Input
  let generateFirstAccessRecoverTokenService: jest.Mock
  let sut: GenerateFirstAccessRecoverTokenController

  beforeAll(() => {
    input = {
      email: 'any_email'
    }
    generateFirstAccessRecoverTokenService = jest.fn()
    generateFirstAccessRecoverTokenService.mockResolvedValue({ recoverToken: 'any_recover_token' })
  })

  beforeEach(() => {
    sut = new GenerateFirstAccessRecoverTokenController(generateFirstAccessRecoverTokenService)
  })

  it('should call generateFirstAccessRecoverTokenService with correct params', async () => {
    await sut.handle(input)

    expect(generateFirstAccessRecoverTokenService).toHaveBeenCalledWith(input)
    expect(generateFirstAccessRecoverTokenService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if generateFirstAccessRecoverTokenService fails', async () => {
    generateFirstAccessRecoverTokenService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(input)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if generateFirstAccessRecoverTokenService succeeds', async () => {
    const httpResponse = await sut.handle(input)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { recoverToken: 'any_recover_token' }
    })
  })
})
