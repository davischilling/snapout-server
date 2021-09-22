import { FindContactByIdAndUpdate, FindContactByIdAndUpdateService } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindContactByIdAndUpdateController extends Controller {
  constructor (
    private readonly findContactByIdAndUpdateService: FindContactByIdAndUpdateService
  ) {
    super()
  }

  async perform (params: FindContactByIdAndUpdate.Input): Promise<HttpResponse<FindContactByIdAndUpdate.Output>> {
    try {
      const contact = await this.findContactByIdAndUpdateService(params)
      return ok(contact)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
