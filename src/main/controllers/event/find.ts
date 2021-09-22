import { FindEvents, FindEventsService } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindEventsController extends Controller {
  constructor (
    private readonly findEventsService: FindEventsService
  ) {
    super()
  }

  async perform (params: FindEvents.Input): Promise<HttpResponse<FindEvents.Output>> {
    try {
      const events = await this.findEventsService(params)
      return ok(events)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
