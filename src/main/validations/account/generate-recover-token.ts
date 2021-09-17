import Joi from 'joi'

export const generateRecoverTokenAllowedParams = ['email']

export const generateRecoverTokenSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
})
