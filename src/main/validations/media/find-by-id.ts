import Joi from 'joi'

export const findMediaByIdAllowedParams = ['id']

export const findMediaByIdSchema = Joi.object({
  id: Joi.string().required()
})
