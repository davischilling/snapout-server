import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'
import { SignIn, SignInService } from '@/domain/use-cases'

export class SignInController extends Controller {
  constructor (
    private readonly signInService: SignInService
  ) {
    super()
  }

  async perform (params: SignIn.Input): Promise<HttpResponse<SignIn.Output>> {
    try {
      const accessToken = await this.signInService(params)
      return ok(accessToken)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
