import Joi from 'joi'

export const findContactByIdAndUpdateAllowedParams = [
  'id', 'message', 'email', 'eventManager', 'phone'
]

export const findContactByIdAndUpdateSchema = Joi.object({
  id: Joi.string().required(),
  message: Joi.string().required(),
  email: Joi.string().required(),
  eventManager: Joi.string().required(),
  phone: Joi.string().required()
})
