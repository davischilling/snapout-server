import { Controller } from '@/application/controllers'
import { created, HttpResponse, unauthorized } from '@/application/helpers'
import { CreateMedia, CreateMediaService } from '@/domain/use-cases'

export class CreateMediaController extends Controller {
  constructor (
    private readonly createMedia: CreateMediaService
  ) {
    super()
  }

  async perform (params: CreateMedia.Input): Promise<HttpResponse<CreateMedia.Output>> {
    try {
      const id = await this.createMedia(params)
      return created(id)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
