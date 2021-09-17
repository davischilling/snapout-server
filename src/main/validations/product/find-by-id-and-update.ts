import { PortionTypes } from '@/domain/models'

import Joi from 'joi'

export const findProductByIdAndUpdateAllowedParams = [
  'id', 'name', 'fat', 'carbohydrate', 'protein', 'portion', 'isConsumableAlone'
]

export const findProductByIdAndUpdateSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string(),
  fat: Joi.number(),
  carbohydrate: Joi.number(),
  protein: Joi.number(),
  portion: Joi.string().valid(PortionTypes.grams, PortionTypes.unity),
  isConsumableAlone: Joi.boolean()
})
