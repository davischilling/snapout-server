import Joi from 'joi'

export const createEventAllowedParams = [
  'weekDay', 'dayMonth', 'city', 'local'
]

export const createEventSchema = Joi.object({
  weekDay: Joi.string().required(),
  dayMonth: Joi.string().required(),
  city: Joi.string().required(),
  local: Joi.string().required()
})
