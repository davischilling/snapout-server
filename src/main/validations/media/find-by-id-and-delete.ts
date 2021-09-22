import Joi from 'joi'

export const findMediaByIdAndDeleteAllowedParams = ['id']

export const findMediaByIdAndDeleteSchema = Joi.object({
  id: Joi.string().required()
})
