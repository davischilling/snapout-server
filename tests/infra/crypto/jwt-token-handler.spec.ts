import { AccessTokenTypes } from '@/main/types'
import { JwtToken } from '@/infra/crypto'

import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

describe('JwtToken', () => {
  let secret: string
  let fakeJwt: jest.Mocked<typeof jwt>
  let sut: JwtToken

  beforeAll(() => {
    fakeJwt = jwt as jest.Mocked<typeof jwt>
  })

  beforeEach(() => {
    secret = 'any_secret'
    sut = new JwtToken(secret)
  })

  describe('generate', () => {
    let key: { id: string, type: AccessTokenTypes }
    let token: string
    let expirationInMs: number

    beforeAll(() => {
      key = { id: 'any_id', type: AccessTokenTypes.access }
      token = 'any_token'
      expirationInMs = 1000
      // mockImplementation é usado em métodos síncronos,
      // modificando a implementação do método
      // para que o valor possa ser retornado
      fakeJwt.sign.mockImplementation(() => token)
    })

    it('should call jwt.sign with correct params', async () => {
      await sut.generate({ key, expirationInMs })

      expect(fakeJwt.sign).toHaveBeenCalledWith(
        { key },
        secret,
        { expiresIn: 1 }
      )
      expect(fakeJwt.sign).toHaveBeenCalledTimes(1)
    })

    it('should return a token on success', async () => {
      const generatedToken = await sut.generate({ key, expirationInMs })

      expect(generatedToken).toBe(token)
    })

    it('should rethrow if jwt.sign throws', async () => {
      fakeJwt.sign.mockImplementationOnce(() => { throw new Error('token_error') })

      const promise = sut.generate({ key, expirationInMs })

      await expect(promise).rejects.toThrow(new Error('token_error'))
    })
  })

  describe('validate', () => {
    let key: string
    let token: string

    beforeAll(() => {
      key = 'any_key'
      token = 'any_token'
      fakeJwt.verify.mockImplementation(() => ({ key }))
    })

    it('should call jwt.verify with correct params', async () => {
      await sut.validate({ token })

      expect(fakeJwt.verify).toHaveBeenCalledWith(token, secret)
      expect(fakeJwt.verify).toHaveBeenCalledTimes(1)
    })

    it('should return the key used to sign', async () => {
      const generatedKey = await sut.validate({ token })

      expect(generatedKey).toBe(key)
    })

    it('should rethrow if jwt.verify throws', async () => {
      fakeJwt.verify.mockImplementationOnce(() => { throw new Error('key_error') })

      const promise = sut.validate({ token })

      await expect(promise).rejects.toThrow(new Error('key_error'))
    })

    it('should throw if jwt.verify returns null', async () => {
      fakeJwt.verify.mockImplementationOnce(() => null)

      const promise = sut.validate({ token })

      await expect(promise).rejects.toThrow()
    })
  })
})
