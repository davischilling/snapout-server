import Joi from 'joi'

export const updatePasswordAllowedParams = ['old_password', 'password', 'repeat_password']

export const updatePasswordSchema = Joi.object({
  old_password: Joi.string().required(),
  password: Joi.string().required(),
  repeat_password: Joi.string().required()
})
