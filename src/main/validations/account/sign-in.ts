import Joi from 'joi'

export const signInAllowedParams = ['email', 'password']

export const signInSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required()
})
