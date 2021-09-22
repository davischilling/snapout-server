import { FindEventByIdAndDelete, FindEventByIdAndDeleteService } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindEventByIdAndDeleteController extends Controller {
  constructor (
    private readonly findEventByIdAndDeleteService: FindEventByIdAndDeleteService
  ) {
    super()
  }

  async perform (params: FindEventByIdAndDelete.Input): Promise<HttpResponse<FindEventByIdAndDelete.Output>> {
    try {
      const id = await this.findEventByIdAndDeleteService(params)
      return ok(id)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
