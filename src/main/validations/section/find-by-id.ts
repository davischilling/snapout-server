import Joi from 'joi'

export const findSectionByIdAllowedParams = ['id']

export const findSectionByIdSchema = Joi.object({
  id: Joi.string().required()
})
