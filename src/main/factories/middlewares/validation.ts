import { ValidationMiddleware } from '@/application/middlewares'

export const makeValidationMiddleware = (schema: any, allowedParams: string[]): ValidationMiddleware => {
  return new ValidationMiddleware(schema, allowedParams)
}
