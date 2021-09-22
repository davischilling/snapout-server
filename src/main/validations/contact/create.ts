import Joi from 'joi'

export const createContactAllowedParams = [
  'message', 'email', 'eventManager', 'phone'
]

export const createContactSchema = Joi.object({
  message: Joi.string().required(),
  email: Joi.string().required(),
  eventManager: Joi.string().required(),
  phone: Joi.string().required(),
})
