import Joi from 'joi'

export const findContactByIdAllowedParams = ['id']

export const findContactByIdSchema = Joi.object({
  id: Joi.string().required()
})
