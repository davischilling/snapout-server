import Joi from 'joi'

export const findParagraphByIdAndDeleteAllowedParams = ['id']

export const findParagraphByIdAndDeleteSchema = Joi.object({
  id: Joi.string().required()
})
