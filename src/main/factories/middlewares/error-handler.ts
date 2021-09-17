import { ErrorHandlerMiddleware } from '@/application/middlewares'

export const makeErrorHandlerMiddleware = (): ErrorHandlerMiddleware => {
  return new ErrorHandlerMiddleware()
}
