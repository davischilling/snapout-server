import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'
import { UpdateAccountPassword, UpdateAccountPasswordService } from '@/domain/use-cases'

export class UpdateAccountPasswordController extends Controller {
  constructor (
    private readonly updateAccountPasswordService: UpdateAccountPasswordService
  ) {
    super()
  }

  async perform (params: UpdateAccountPassword.Input): Promise<HttpResponse<UpdateAccountPassword.Output>> {
    try {
      const account = await this.updateAccountPasswordService(params)
      return ok(account)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
