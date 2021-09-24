import Joi from 'joi'

export const createParagraphAllowedParams = [
  'paragraph'
]

export const createParagraphSchema = Joi.object({
  paragraph: Joi.string().required()
})
