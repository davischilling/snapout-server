import Joi from 'joi'

export const findSectionByIdAndUpdateAllowedParams = [
  'id', 'menuName', 'entityName', 'sectionTitle'
]

export const findSectionByIdAndUpdateSchema = Joi.object({
  id: Joi.string().required(),
  menuName: Joi.string().required(),
  entityName: Joi.string().required(),
  sectionTitle: Joi.string().required()
})
