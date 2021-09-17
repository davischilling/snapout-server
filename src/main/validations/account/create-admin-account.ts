import Joi from 'joi'

export const createAdminAccountAllowedParams = ['email']

export const createAdminAccountSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
})
