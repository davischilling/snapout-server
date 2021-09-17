import { FindUserById, FindUserByIdService } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindUserByIdController extends Controller {
  constructor (
    private readonly findUserByIdService: FindUserByIdService
  ) {
    super()
  }

  async perform (params: FindUserById.Input): Promise<HttpResponse<FindUserById.Output>> {
    try {
      const user = await this.findUserByIdService(params)
      return ok(user)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
