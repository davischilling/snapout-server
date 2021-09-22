import { FindEventByIdAndUpdate, FindEventByIdAndUpdateService } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindEventByIdAndUpdateController extends Controller {
  constructor (
    private readonly findEventByIdAndUpdateService: FindEventByIdAndUpdateService
  ) {
    super()
  }

  async perform (params: FindEventByIdAndUpdate.Input): Promise<HttpResponse<FindEventByIdAndUpdate.Output>> {
    try {
      const event = await this.findEventByIdAndUpdateService(params)
      return ok(event)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
