import { CurrentAccountService, CurrentAccount } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class CurrentAccountController extends Controller {
  constructor (
    private readonly currentAccountService: CurrentAccountService
  ) {
    super()
  }

  async perform (params: CurrentAccount.Input): Promise<HttpResponse<CurrentAccount.Output>> {
    try {
      const account = await this.currentAccountService(params)
      return ok(account)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
