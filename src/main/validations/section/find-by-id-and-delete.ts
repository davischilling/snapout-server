import Joi from 'joi'

export const findSectionByIdAndDeleteAllowedParams = ['id']

export const findSectionByIdAndDeleteSchema = Joi.object({
  id: Joi.string().required()
})
