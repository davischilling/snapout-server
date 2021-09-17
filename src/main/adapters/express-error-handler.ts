import { Middleware } from '@/application/helpers'

import { ErrorRequestHandler } from 'express'

type adapter = (middleware: Middleware) => ErrorRequestHandler

export const adaptExpressErrorHandler: adapter = (middleware) => async (_err, req, res, next) => {
  const { statusCode, data } = await middleware.handle({ _err, req, res })
  res.status(statusCode).json({ error: data.message })
}
