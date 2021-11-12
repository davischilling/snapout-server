import { json, Express } from 'express'
import cors from 'cors'

const whitelist = process.env.CLIENT_URL !== null ? (process.env.CLIENT_URL as string).split(' ') : ''
const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (origin === undefined || whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

export const setupMiddlewares = (app: Express): void => {
  app.use(cors(corsOptions))
  app.use(json())
  app.use((req, res, next) => {
    res.type('json')
    next()
  })
}
