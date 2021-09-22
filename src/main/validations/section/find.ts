import Joi from 'joi'

export const findSectionAllowedParams = [
  'menuName', 'entityName', 'sectionTitle'
]

export const findSectionSchema = Joi.object({
  menuName: Joi.string(),
  entityName: Joi.string(),
  sectionTitle: Joi.string()
})
