import Joi from 'joi'

export const findProductByIdAllowedParams = ['id']

export const findProductByIdSchema = Joi.object({
  id: Joi.string().required()
})
