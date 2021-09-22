import Joi from 'joi'

export const findEventByIdAndUpdateAllowedParams = [
  'id', 'weekDay', 'dayMonth', 'city', 'local'
]

export const findEventByIdAndUpdateSchema = Joi.object({
  id: Joi.string().required(),
  weekDay: Joi.string().required(),
  dayMonth: Joi.string().required(),
  city: Joi.string().required(),
  local: Joi.string().required()
})
