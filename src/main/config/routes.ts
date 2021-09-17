import { NotFoundError } from '@/application/errors'
import { adaptExpressErrorHandler } from '@/main/adapters'
import { makeErrorHandlerMiddleware } from '@/main/factories/middlewares'

import { Express, Router } from 'express'
import { join } from 'path'
import { readdirSync } from 'fs'

export const setupRoutes = (app: Express): void => {
  const router = Router()

  readdirSync(join(__dirname, '../routes'))
    .filter(file => !file.endsWith('.map'))
    .map(async (file) => {
      (await import(`../routes/${file}`)).default(router)
    })

  app.use('/api', router)

  app.all('*', (req, res, next): Error => {
    throw new NotFoundError()
  })

  app.use(adaptExpressErrorHandler(makeErrorHandlerMiddleware()))
}
