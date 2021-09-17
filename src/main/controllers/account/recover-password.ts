import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'
import { RecoverAccountPassword, RecoverAccountPasswordService } from '@/domain/use-cases'

export class RecoverAccountPasswordController extends Controller {
  constructor (
    private readonly recoverAccountPasswordService: RecoverAccountPasswordService
  ) {
    super()
  }

  async perform (params: RecoverAccountPassword.Input): Promise<HttpResponse<RecoverAccountPassword.Output>> {
    try {
      const account = await this.recoverAccountPasswordService(params)
      return ok(account)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
