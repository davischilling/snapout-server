import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'
import { GenerateRecoverToken, GenerateRecoverTokenService } from '@/domain/use-cases'

export class GenerateRecoverTokenController extends Controller {
  constructor (
    private readonly generateRecoverTokenService: GenerateRecoverTokenService
  ) {
    super()
  }

  async perform (params: GenerateRecoverToken.Input): Promise<HttpResponse<GenerateRecoverToken.Output>> {
    try {
      const account = await this.generateRecoverTokenService(params)
      return ok(account)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
