import Joi from 'joi'

export const findUserByIdAllowedParams = ['id']

export const findUserByIdSchema = Joi.object({
  id: Joi.string().required()
})
