import { FindParagraphById, FindParagraphByIdService } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindParagraphByIdController extends Controller {
  constructor (
    private readonly findParagraphByIdService: FindParagraphByIdService
  ) {
    super()
  }

  async perform (params: FindParagraphById.Input): Promise<HttpResponse<FindParagraphById.Output>> {
    try {
      const paragraph = await this.findParagraphByIdService(params)
      return ok(paragraph)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
