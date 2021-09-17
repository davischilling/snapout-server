import { FindUserByIdAndDelete, FindUserByIdAndDeleteService } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindUserByIdAndDeleteController extends Controller {
  constructor (
    private readonly findUserByIdAndDeleteService: FindUserByIdAndDeleteService
  ) {
    super()
  }

  async perform (params: FindUserByIdAndDelete.Input): Promise<HttpResponse<FindUserByIdAndDelete.Output>> {
    try {
      const id = await this.findUserByIdAndDeleteService(params)
      return ok(id)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
