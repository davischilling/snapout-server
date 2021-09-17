import { Controller } from '@/application/controllers'
import { created, HttpResponse, unauthorized } from '@/application/helpers'
import { SignUp, SignUpService } from '@/domain/use-cases'

export class SignUpController extends Controller {
  constructor (
    private readonly signUpService: SignUpService
  ) {
    super()
  }

  async perform (params: SignUp.Input): Promise<HttpResponse<SignUp.Output>> {
    try {
      const accessToken = await this.signUpService(params)
      return created(accessToken)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
