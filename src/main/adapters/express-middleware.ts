import { Middleware } from '@/application/helpers'
import { MiddlewareTypes } from '@/main/types/middlewares'

import { RequestHandler } from 'express'

type adapter = (middleware: Middleware, type: MiddlewareTypes) => RequestHandler

export const adaptExpressMiddleware: adapter = (middleware, type) => async (req, res, next) => {
  const { statusCode, data } = await middleware.handle(
    type === MiddlewareTypes.auth
      ? { ...req.headers }
      : type === MiddlewareTypes.validation
        ? { ...req.body, ...req.params, ...req.query }
        : null
  )
  if (statusCode === 200) {
    const entries = Object.entries(data).filter(entry => entry[1])
    req.locals = { ...req.locals, ...Object.fromEntries(entries) }
    next()
  } else {
    res.status(statusCode).json({ error: data.message })
  }
}
