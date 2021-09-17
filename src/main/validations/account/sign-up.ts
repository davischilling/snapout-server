import Joi from 'joi'

export const signUpAllowedParams = ['name', 'phone', 'email', 'password', 'repeat_password']

const passwordPattern = /^[a-zA-Z0-9]{3,30}$/

export const signUpSchema = Joi.object({
  name: Joi.string(),
  phone: Joi.string()
    .alphanum()
    .length(10)
    .pattern(/^[0-9]+$/),
  password: Joi.string()
    .pattern(new RegExp(passwordPattern)).required(),
  repeat_password: Joi.string().required(),
  email: Joi.string()
    .email()
    .required()
})
  .with('name', 'phone')
  .xor('password')
  .with('password', 'repeat_password')
