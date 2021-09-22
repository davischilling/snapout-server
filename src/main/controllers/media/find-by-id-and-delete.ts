import { FindMediaByIdAndDelete, FindMediaByIdAndDeleteService } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindMediaByIdAndDeleteController extends Controller {
  constructor (
    private readonly findMediaByIdAndDeleteService: FindMediaByIdAndDeleteService
  ) {
    super()
  }

  async perform (params: FindMediaByIdAndDelete.Input): Promise<HttpResponse<FindMediaByIdAndDelete.Output>> {
    try {
      const id = await this.findMediaByIdAndDeleteService(params)
      return ok(id)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
