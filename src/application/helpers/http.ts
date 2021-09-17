import { HttpException, ForbiddenError, ServerError, UnauthorizedError } from '@/application/errors'
// import { NotFoundError } from '@/application/errors'

export type HttpResponse<T = any> = {
  statusCode: number
  data: T
}

export const ok = <T = any> (data: T): HttpResponse<T> => ({
  statusCode: 200,
  data
})

export const created = <T = any> (data: T): HttpResponse<T> => ({
  statusCode: 201,
  data
})

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  data: error
})

export const unauthorized = (): HttpResponse<Error> => ({
  statusCode: 401,
  data: new UnauthorizedError()
})

export const forbidden = (): HttpResponse<Error> => ({
  statusCode: 403,
  data: new ForbiddenError()
})

// export const notFound = (): HttpResponse<Error> => ({
//   statusCode: 404,
//   data: new NotFoundError()
// })

export const serverError = (error: Error): HttpResponse<Error> => ({
  statusCode: 500,
  data: new ServerError(error)
})

type httpExceptionType = { status: number, _err: Error }

export const httpException = ({ status = 500, _err }: httpExceptionType): HttpResponse<Error> => ({
  statusCode: status,
  data: new HttpException(status, _err.message)
})
