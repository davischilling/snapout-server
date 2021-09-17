import Joi from 'joi'

export const findUserByIdAndDeleteAllowedParams = ['id']

export const findUserByIdAndDeleteSchema = Joi.object({
  id: Joi.string().required()
})
