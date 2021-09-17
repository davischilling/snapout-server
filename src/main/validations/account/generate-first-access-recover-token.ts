import Joi from 'joi'

export const generateFirstAccessRecoverTokenAllowedParams = ['email']

export const generateFirstAccessRecoverTokenSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
})
