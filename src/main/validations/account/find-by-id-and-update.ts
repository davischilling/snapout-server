import Joi from 'joi'

export const findByIdAndUpdateAllowedParams = ['name', 'phone']

export const findByIdAndUpdateSchema = Joi.object({
  name: Joi.string(),
  phone: Joi.string()
})
