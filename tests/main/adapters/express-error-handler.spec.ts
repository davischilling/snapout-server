import { HttpException } from '@/application/errors'
import { Middleware } from '@/application/helpers'
import { adaptExpressErrorHandler } from '@/main/adapters'

import { getMockReq, getMockRes } from '@jest-mock/express'
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { mock, MockProxy } from 'jest-mock-extended'

describe('ExpressErrorHandlerAdapter', () => {
  let _err: Error
  let req: Request
  let res: Response
  let next: NextFunction
  let middleware: MockProxy<Middleware>
  let sut: ErrorRequestHandler

  beforeAll(() => {
    _err = new Error('any_error')
    req = getMockReq()
    res = getMockRes().res
    next = getMockRes().next
    middleware = mock()
    middleware.handle.mockResolvedValue({
      statusCode: 500,
      data: new HttpException(500, 'Not found')
    })
  })

  beforeEach(() => {
    sut = adaptExpressErrorHandler(middleware)
  })

  it('should call handle with correct request', async () => {
    await sut(_err, req, res, next)

    expect(middleware.handle).toHaveBeenCalledWith({ _err, req, res })
    expect(middleware.handle).toHaveBeenCalledTimes(1)
  })

  it('should respond with correct error and statusCode', async () => {
    await sut(_err, req, res, next)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ error: 'Not found' })
    expect(res.json).toHaveBeenCalledTimes(1)
  })
})
