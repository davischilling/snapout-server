import { FindEventById, FindEventByIdService } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindEventByIdController extends Controller {
  constructor (
    private readonly findEventByIdService: FindEventByIdService
  ) {
    super()
  }

  async perform (params: FindEventById.Input): Promise<HttpResponse<FindEventById.Output>> {
    try {
      const event = await this.findEventByIdService(params)
      return ok(event)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
