import { FindUserByIdAndUpdate, FindUserByIdAndUpdateService } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindUserByIdAndUpdateController extends Controller {
  constructor (
    private readonly findUserByIdAndUpdateService: FindUserByIdAndUpdateService
  ) {
    super()
  }

  async perform (params: FindUserByIdAndUpdate.Input): Promise<HttpResponse<FindUserByIdAndUpdate.Output>> {
    try {
      const user = await this.findUserByIdAndUpdateService(params)
      return ok(user)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
