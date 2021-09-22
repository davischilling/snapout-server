import Joi from 'joi'

export const createSectionAllowedParams = [
  'menuName', 'entityName', 'sectionTitle'
]

export const createSectionSchema = Joi.object({
  menuName: Joi.string().required(),
  entityName: Joi.string().required(),
  sectionTitle: Joi.string().required(),
})
