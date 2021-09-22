import Joi from 'joi'

export const findParagraphAllowedParams = [
  'paragraph'
]

export const findParagraphSchema = Joi.object({
  paragraph: Joi.string()
})
