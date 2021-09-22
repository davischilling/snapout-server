import { FindMediaById, FindMediaByIdService } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindMediaByIdController extends Controller {
  constructor (
    private readonly findMediaByIdService: FindMediaByIdService
  ) {
    super()
  }

  async perform (params: FindMediaById.Input): Promise<HttpResponse<FindMediaById.Output>> {
    try {
      const media = await this.findMediaByIdService(params)
      return ok(media)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
