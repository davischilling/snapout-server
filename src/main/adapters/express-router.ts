import { Controller } from '@/application/controllers'

import { RequestHandler } from 'express'

type Adapter = (controller: Controller) => RequestHandler

export const adaptExpressRoute: Adapter = controller => async (req, res) => {
  const { statusCode, data } = await controller.handle({
    ...req.body, ...req.query, ...req.params, ...req.locals
  })
  const json = (statusCode >= 200 && statusCode < 300)
    ? data
    : { error: data.message }
  res.status(statusCode).json(json)
}
