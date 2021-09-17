import { badRequest, HttpResponse, ok, Middleware } from '@/application/helpers'
import { ValidationError } from '@/application/errors'

type HttpRequest = any
type Model = Error | {}
type Validate = (httpRequest: HttpRequest) => { value: string, error?: string }
export type Schema = { validate: Validate }

export class ValidationMiddleware implements Middleware {
  constructor (
    private readonly schema: Schema,
    private readonly allowedParams: string[]
  ) {}

  async handle (params: HttpRequest): Promise<HttpResponse<Model>> {
    const allowedParamsResult = this.validateAllowedParams(params)
    if (allowedParamsResult instanceof Error) { return badRequest(allowedParamsResult) }
    const { error } = this.schema.validate(params)
    if (error !== '' && error !== undefined && error !== null) {
      return badRequest(new ValidationError(error))
    }
    return ok({})
  }

  validateAllowedParams (params: any): ValidationError | null {
    for (const param in params) {
      if (!this.allowedParams.includes(param)) {
        return new ValidationError(`The param ${param} is not allowed.`)
      }
    }
    return null
  }
}
