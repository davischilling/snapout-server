import { Middleware } from '@/application/helpers'
import { adaptExpressMiddleware } from '@/main/adapters'
import { MiddlewareTypes } from '@/main/types/middlewares'

import { RequestHandler, NextFunction, Request, Response } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { mock, MockProxy } from 'jest-mock-extended'

describe('ExpressMiddleware', () => {
  let req: Request
  let res: Response
  let next: NextFunction
  let middleware: MockProxy<Middleware>
  let type: MiddlewareTypes
  let sut: RequestHandler

  beforeAll(() => {
    res = getMockRes().res
    next = getMockRes().next
    middleware = mock()
    middleware.handle.mockResolvedValue({
      statusCode: 200,
      data: {
        emptyProp: '',
        nullProp: null,
        undefinedProp: undefined,
        prop: 'any_value'
      }
    })
  })

  describe('Authentication', () => {
    beforeAll(() => {
      req = getMockReq({
        headers: { headers_data: 'any' }
      })
      type = MiddlewareTypes.auth
    })

    beforeEach(() => {
      sut = adaptExpressMiddleware(middleware, type)
    })

    it('should call handle with correct request', async () => {
      await sut(req, res, next)

      expect(middleware.handle).toHaveBeenCalledWith({ headers_data: 'any' })
      expect(middleware.handle).toHaveBeenCalledTimes(1)
    })

    it('should call handle with empty request', async () => {
      req = getMockReq({ headers: {} })

      await sut(req, res, next)

      expect(middleware.handle).toHaveBeenCalledWith({})
      expect(middleware.handle).toHaveBeenCalledTimes(1)
    })

    it('should respond with correct error and statusCode', async () => {
      middleware.handle.mockResolvedValueOnce({
        statusCode: 500,
        data: new Error('any_error')
      })

      await sut(req, res, next)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.status).toHaveBeenCalledTimes(1)
      expect(res.json).toHaveBeenCalledWith({ error: 'any_error' })
      expect(res.json).toHaveBeenCalledTimes(1)
    })

    it('should add valid data to req.locals', async () => {
      await sut(req, res, next)

      expect(req.locals).toEqual({ prop: 'any_value' })
      expect(next).toHaveBeenCalledTimes(1)
    })
  })

  describe('Validation', () => {
    beforeAll(() => {
      req = getMockReq({
        body: { body_data: 'any' },
        params: { params_data: 'any' },
        query: { query_data: 'any' }
      })
      type = MiddlewareTypes.validation
    })

    beforeEach(() => {
      sut = adaptExpressMiddleware(middleware, type)
    })

    it('should call handle with correct request', async () => {
      await sut(req, res, next)

      expect(middleware.handle).toHaveBeenCalledWith({
        body_data: 'any',
        params_data: 'any',
        query_data: 'any'
      })
      expect(middleware.handle).toHaveBeenCalledTimes(1)
    })

    it('should call handle with empty request', async () => {
      req = getMockReq({
        body: {},
        params: {},
        query: {}
      })

      await sut(req, res, next)

      expect(middleware.handle).toHaveBeenCalledWith({})
      expect(middleware.handle).toHaveBeenCalledTimes(1)
    })

    it('should respond with correct error and statusCode', async () => {
      middleware.handle.mockResolvedValueOnce({
        statusCode: 500,
        data: new Error('any_error')
      })

      await sut(req, res, next)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.status).toHaveBeenCalledTimes(1)
      expect(res.json).toHaveBeenCalledWith({ error: 'any_error' })
      expect(res.json).toHaveBeenCalledTimes(1)
    })

    it('should add valid data to req.locals', async () => {
      await sut(req, res, next)

      expect(req.locals).toEqual({ prop: 'any_value' })
      expect(next).toHaveBeenCalledTimes(1)
    })
  })
})
