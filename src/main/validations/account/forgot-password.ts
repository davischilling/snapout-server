import Joi from 'joi'

export const forgotPasswordAllowedParams = ['email']

export const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
})
