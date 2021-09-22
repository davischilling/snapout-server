import { FindMedias, FindMediasService } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindMediasController extends Controller {
  constructor (
    private readonly findMediasService: FindMediasService
  ) {
    super()
  }

  async perform (params: FindMedias.Input): Promise<HttpResponse<FindMedias.Output>> {
    try {
      const medias = await this.findMediasService(params)
      return ok(medias)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
