import { json, Express } from 'express'
import cors from 'cors'

export const setupMiddlewares = (app: Express): void => {
  app.use(cors({
    origin: process.env.CLIENT_URL
  }))
  app.use(json())
  app.use((req, res, next) => {
    res.type('json')
    next()
  })
}
