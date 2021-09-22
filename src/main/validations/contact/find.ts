import Joi from 'joi'

export const findContactAllowedParams = [
  'message', 'email', 'eventManager', 'phone'
]

export const findContactSchema = Joi.object({
  message: Joi.string(),
  email: Joi.string(),
  eventManager: Joi.string(),
  phone: Joi.string()
})
