import Joi from 'joi'

export const findEventByIdAllowedParams = ['id']

export const findEventByIdSchema = Joi.object({
  id: Joi.string().required()
})
