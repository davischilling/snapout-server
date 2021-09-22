import { FindMediaByIdAndUpdate, FindMediaByIdAndUpdateService } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindMediaByIdAndUpdateController extends Controller {
  constructor (
    private readonly findMediaByIdAndUpdateService: FindMediaByIdAndUpdateService
  ) {
    super()
  }

  async perform (params: FindMediaByIdAndUpdate.Input): Promise<HttpResponse<FindMediaByIdAndUpdate.Output>> {
    try {
      const media = await this.findMediaByIdAndUpdateService(params)
      return ok(media)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
