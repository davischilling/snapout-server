import { FindAccountByIdAndUpdate, FindAccountByIdAndUpdateService } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindAccountByIdAndUpdateController extends Controller {
  constructor (
    private readonly findAccountByIdAndUpdateService: FindAccountByIdAndUpdateService
  ) {
    super()
  }

  async perform (params: FindAccountByIdAndUpdate.Input): Promise<HttpResponse<FindAccountByIdAndUpdate.Output>> {
    try {
      const account = await this.findAccountByIdAndUpdateService(params)
      return ok(account)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
