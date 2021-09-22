import { Controller } from '@/application/controllers'
import { created, HttpResponse, unauthorized } from '@/application/helpers'
import { CreateEvent, CreateEventService } from '@/domain/use-cases'

export class CreateEventController extends Controller {
  constructor(
    private readonly createEvent: CreateEventService
  ) {
    super()
  }

  async perform(params: CreateEvent.Input): Promise<HttpResponse<CreateEvent.Output>> {
    try {
      const id = await this.createEvent(params)
      return created(id)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
