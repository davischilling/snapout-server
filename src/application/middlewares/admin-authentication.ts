import { forbidden, HttpResponse, ok, Middleware } from '@/application/helpers'
import { Encripter } from '@/data/contracts/crypto'

type HttpRequest = { secret: string }
type Model = Error | {}

export class AdminAuthenticationMiddleware implements Middleware {
  constructor (
    private readonly crypto: Encripter
  ) {}

  async handle ({ secret }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      if ((secret !== '' && secret !== undefined && secret !== null) && await this.crypto.compare({
        storedPassword: process.env.ADMIN_SECRET as string,
        suppliedPassword: secret
      })) {
        return ok({})
      } else {
        return forbidden()
      }
    } catch {
      return forbidden()
    }
  }
}
