import { ForbiddenError } from '@/application/errors'
import { AdminAuthenticationMiddleware } from '@/application/middlewares'
import { Encripter } from '@/data/contracts/crypto'

import { mock, MockProxy } from 'jest-mock-extended'

describe('AdminAuthenticationMiddleware', () => {
  let secret: string
  let crypto: MockProxy<Encripter>
  let sut: AdminAuthenticationMiddleware

  beforeAll(() => {
    crypto = mock()
  })

  beforeEach(() => {
    secret = 'any_secret_token'
    crypto.compare.mockResolvedValue(true)
    sut = new AdminAuthenticationMiddleware(crypto)
  })

  it('should return 403 if secret is empty', async () => {
    const httpResponse = await sut.handle({ secret: '' })

    expect(httpResponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError()
    })
  })

  it('should return 403 if secret is null', async () => {
    const httpResponse = await sut.handle({ secret: null as any })

    expect(httpResponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError()
    })
  })

  it('should return 403 if secret is undefined', async () => {
    const httpResponse = await sut.handle({ secret: undefined as any })

    expect(httpResponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError()
    })
  })

  it('should call crypto.compare with correct params', async () => {
    await sut.handle({ secret })

    expect(crypto.compare).toHaveBeenCalledWith({
      storedPassword: process.env.ADMIN_SECRET as string,
      suppliedPassword: secret
    })
    expect(crypto.compare).toHaveBeenCalledTimes(1)
  })

  it('should return 403 if crypto.compare returns false', async () => {
    crypto.compare.mockResolvedValueOnce(false)

    const httpResponse = await sut.handle({ secret })

    expect(httpResponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError()
    })
  })

  it('should return 403 if crypto.compare throws', async () => {
    crypto.compare.mockRejectedValueOnce(new Error('any_error'))

    const httpResponse = await sut.handle({ secret })

    expect(httpResponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError()
    })
  })

  it('should return 200 on success', async () => {
    const httpResponse = await sut.handle({ secret })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {}
    })
  })
})
