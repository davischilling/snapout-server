import Joi from 'joi'

export const findContactByIdAndDeleteAllowedParams = ['id']

export const findContactByIdAndDeleteSchema = Joi.object({
  id: Joi.string().required()
})
