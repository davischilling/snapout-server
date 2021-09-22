import Joi from 'joi'

export const findEventAllowedParams = [
  'weekDay', 'dayMonth', 'city', 'local'
]

export const findEventSchema = Joi.object({
  weekDay: Joi.string(),
  dayMonth: Joi.string(),
  city: Joi.string(),
  local: Joi.string()
})
