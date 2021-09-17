import { PortionTypes } from '@/domain/models'

import Joi from 'joi'

export const findProductAllowedParams = [
  'name', 'fat', 'carbohydrate', 'protein', 'portion', 'isConsumableAlone'
]

export const findProductSchema = Joi.object({
  name: Joi.string(),
  fat: Joi.number(),
  carbohydrate: Joi.number(),
  protein: Joi.number(),
  portion: Joi.string().valid(PortionTypes.grams, PortionTypes.unity),
  isConsumableAlone: Joi.boolean()
})
