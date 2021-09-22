import { FindContactById, FindContactByIdService } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindContactByIdController extends Controller {
  constructor (
    private readonly findContactByIdService: FindContactByIdService
  ) {
    super()
  }

  async perform (params: FindContactById.Input): Promise<HttpResponse<FindContactById.Output>> {
    try {
      const contact = await this.findContactByIdService(params)
      return ok(contact)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
