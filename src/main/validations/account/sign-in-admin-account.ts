import Joi from 'joi'

export const signInAdminAccountAllowedParams = ['email']

export const signInAdminAccountSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
})
