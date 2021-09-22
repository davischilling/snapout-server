import Joi from 'joi'

export const findEventByIdAndDeleteAllowedParams = ['id']

export const findEventByIdAndDeleteSchema = Joi.object({
  id: Joi.string().required()
})
