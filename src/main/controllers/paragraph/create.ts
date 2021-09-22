import { Controller } from '@/application/controllers'
import { created, HttpResponse, unauthorized } from '@/application/helpers'
import { CreateParagraph, CreateParagraphService } from '@/domain/use-cases'

export class CreateParagraphController extends Controller {
  constructor(
    private readonly createParagraph: CreateParagraphService
  ) {
    super()
  }

  async perform(params: CreateParagraph.Input): Promise<HttpResponse<CreateParagraph.Output>> {
    try {
      const id = await this.createParagraph(params)
      return created(id)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
