import Joi from 'joi'

export const findParagraphByIdAndUpdateAllowedParams = [
  'id', 'paragraph'
]

export const findParagraphByIdAndUpdateSchema = Joi.object({
  id: Joi.string().required(),
  paragraph: Joi.string().required()
})
