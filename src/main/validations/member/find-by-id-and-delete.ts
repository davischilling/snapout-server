import Joi from 'joi'

export const findMemberByIdAndDeleteAllowedParams = ['id']

export const findMemberByIdAndDeleteSchema = Joi.object({
  id: Joi.string().required()
})
