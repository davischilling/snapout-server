import { Controller } from '@/application/controllers'
import { created, HttpResponse, unauthorized } from '@/application/helpers'
import { CreateAdminAccount, CreateAdminAccountService } from '@/domain/use-cases'

export class CreateAdminAccountController extends Controller {
  constructor (
    private readonly createAdminAccountService: CreateAdminAccountService
  ) {
    super()
  }

  async perform (params: CreateAdminAccount.Input): Promise<HttpResponse<CreateAdminAccount.Output>> {
    try {
      const account = await this.createAdminAccountService(params)
      return created(account)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
