import { ValidationError } from '@/application/errors'
import { Schema, ValidationMiddleware } from '@/application/middlewares'

describe('ValidationMiddleware', () => {
  let schema: Schema
  let allowedParams: string[]
  let sut: ValidationMiddleware

  beforeAll(() => {
    allowedParams = ['param1', 'param2']
  })

  beforeEach(() => {
    schema = {
      validate: jest.fn().mockReturnValue({ value: 'any_value', error: null })
    }
  })

  it('should call validateAllowedParams with correct params', async () => {
    sut = new ValidationMiddleware(schema, allowedParams)
    const validateAllowedParamsSpy = jest.spyOn(sut, 'validateAllowedParams')

    await sut.handle({ data: 'any' })

    expect(validateAllowedParamsSpy).toHaveBeenCalledWith({ data: 'any' })
    expect(validateAllowedParamsSpy).toHaveBeenCalledTimes(1)
  })

  it('should return 400 if validateAllowedParams returns an error', async () => {
    sut = new ValidationMiddleware(schema, allowedParams)

    const httpResponse = await sut.handle({ data: 'any' })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new ValidationError('The param data is not allowed.')
    })
  })

  it('should call schema.validate with correct params', async () => {
    sut = new ValidationMiddleware(schema, allowedParams)

    await sut.handle({ param1: 'any' })

    expect(schema.validate).toHaveBeenCalledWith({ param1: 'any' })
    expect(schema.validate).toHaveBeenCalledTimes(1)
  })

  it('should return 400 if schema.validate returns an error message', async () => {
    schema = {
      validate: jest.fn().mockReturnValue({
        value: 'any_value',
        error: 'error_message'
      })
    }
    sut = new ValidationMiddleware(schema, allowedParams)

    const httpResponse = await sut.handle({ param1: 'any' })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new ValidationError('error_message')
    })
  })

  it('should return 200 on success', async () => {
    sut = new ValidationMiddleware(schema, allowedParams)

    const httpResponse = await sut.handle({ param1: 'any' })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {}
    })
  })
})
