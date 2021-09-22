import { FindContacts, FindContactsService } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindContactsController extends Controller {
  constructor (
    private readonly findContactsService: FindContactsService
  ) {
    super()
  }

  async perform (params: FindContacts.Input): Promise<HttpResponse<FindContacts.Output>> {
    try {
      const contacts = await this.findContactsService(params)
      return ok(contacts)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
