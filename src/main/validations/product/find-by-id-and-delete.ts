import Joi from 'joi'

export const findProductByIdAndDeleteAllowedParams = ['id']

export const findProductByIdAndDeleteSchema = Joi.object({
  id: Joi.string().required()
})
