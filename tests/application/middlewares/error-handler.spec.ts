import { ErrorHandlerMiddleware } from '@/application/middlewares'
import { HttpException } from '@/application/errors'

import { getMockRes, getMockReq } from '@jest-mock/express'
import { Request, Response } from 'express'

describe('ErrorHandlerMiddleware', () => {
  let _err: Error
  let req: Request
  let res: Response
  let sut: ErrorHandlerMiddleware

  beforeAll(() => {
    _err = new Error('any_error')
    req = getMockReq()
    res = getMockRes().res
  })

  it('should return 500 with the HttpException error', async () => {
    sut = new ErrorHandlerMiddleware()

    const httpResponse = await sut.handle({ _err, req, res })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new HttpException(500, 'any_error')
    })
  })
})
