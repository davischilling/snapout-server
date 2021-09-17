import { httpException, HttpResponse, Middleware } from '@/application/helpers'

import { Request, Response } from 'express'

type HttpRequest = { _err: Error, req: Request, res: Response }

export class ErrorHandlerMiddleware implements Middleware {
  async handle ({ _err }: HttpRequest): Promise<HttpResponse<Error>> {
    return httpException({ status: 500, _err })
  }
}
