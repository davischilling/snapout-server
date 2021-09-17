import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'
import { SignInAdminAccount, SignInAdminAccountService } from '@/domain/use-cases'

export class SignInAdminAccountController extends Controller {
  constructor (
    private readonly SignInAdminAccountService: SignInAdminAccountService
  ) {
    super()
  }

  async perform (params: SignInAdminAccount.Input): Promise<HttpResponse<SignInAdminAccount.Output>> {
    try {
      const account = await this.SignInAdminAccountService(params)
      return ok(account)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
