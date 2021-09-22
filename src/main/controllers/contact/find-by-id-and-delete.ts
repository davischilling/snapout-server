import { FindContactByIdAndDelete, FindContactByIdAndDeleteService } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindContactByIdAndDeleteController extends Controller {
  constructor (
    private readonly findContactByIdAndDeleteService: FindContactByIdAndDeleteService
  ) {
    super()
  }

  async perform (params: FindContactByIdAndDelete.Input): Promise<HttpResponse<FindContactByIdAndDelete.Output>> {
    try {
      const id = await this.findContactByIdAndDeleteService(params)
      return ok(id)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
