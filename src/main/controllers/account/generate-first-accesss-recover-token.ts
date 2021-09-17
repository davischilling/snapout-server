import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'
import { GenerateFirstAccessRecoverToken, GenerateFirstAccessRecoverTokenService } from '@/domain/use-cases'

export class GenerateFirstAccessRecoverTokenController extends Controller {
  constructor (
    private readonly generateFirstAccessRecoverTokenService: GenerateFirstAccessRecoverTokenService
  ) {
    super()
  }

  async perform (params: GenerateFirstAccessRecoverToken.Input): Promise<HttpResponse<GenerateFirstAccessRecoverToken.Output>> {
    try {
      const account = await this.generateFirstAccessRecoverTokenService(params)
      return ok(account)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
