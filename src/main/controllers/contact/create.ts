import { Controller } from '@/application/controllers'
import { created, HttpResponse, unauthorized } from '@/application/helpers'
import { CreateContact, CreateContactService } from '@/domain/use-cases'

export class CreateContactController extends Controller {
  constructor (
    private readonly createContact: CreateContactService
  ) {
    super()
  }

  async perform (params: CreateContact.input): Promise<HttpResponse<CreateContact.output>> {
    try {
      const id = await this.createContact(params)
      return created(id)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }


}
