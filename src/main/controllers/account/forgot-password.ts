import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'
import { ForgotAccountPassword, ForgotAccountPasswordService } from '@/domain/use-cases'

export class ForgotAccountPasswordController extends Controller {
  constructor (
    private readonly forgotAccountPasswordService: ForgotAccountPasswordService
  ) {
    super()
  }

  async perform (params: ForgotAccountPassword.Input): Promise<HttpResponse<ForgotAccountPassword.Output>> {
    try {
      const account = await this.forgotAccountPasswordService(params)
      return ok(account)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
