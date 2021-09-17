import { PortionTypes } from '@/domain/models'

import Joi from 'joi'

export const createProductAllowedParams = [
  'name', 'fat', 'carbohydrate', 'protein', 'portion', 'isConsumableAlone'
]

export const createProductSchema = Joi.object({
  name: Joi.string().required(),
  fat: Joi.number().required(),
  carbohydrate: Joi.number().required(),
  protein: Joi.number().required(),
  portion: Joi.string().valid(PortionTypes.grams, PortionTypes.unity).required(),
  isConsumableAlone: Joi.boolean().required()
})
