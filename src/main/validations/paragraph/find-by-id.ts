import Joi from 'joi'

export const findParagraphByIdAllowedParams = ['id']

export const findParagraphByIdSchema = Joi.object({
  id: Joi.string().required()
})
