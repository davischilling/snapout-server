import Joi from 'joi'

export const recoverPasswordAllowedParams = ['password', 'repeat_password']

export const recoverPasswordSchema = Joi.object({
  password: Joi.string().required(),
  repeat_password: Joi.string().required()
})
