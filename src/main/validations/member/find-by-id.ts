import Joi from 'joi'

export const findMemberByIdAllowedParams = ['id']

export const findMemberByIdSchema = Joi.object({
  id: Joi.string().required()
})
