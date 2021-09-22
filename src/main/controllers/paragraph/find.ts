import { FindParagraphs, FindParagraphsService } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindParagraphsController extends Controller {
  constructor (
    private readonly findParagraphsService: FindParagraphsService
  ) {
    super()
  }

  async perform (params: FindParagraphs.Input): Promise<HttpResponse<FindParagraphs.Output>> {
    try {
      const paragraphs = await this.findParagraphsService(params)
      return ok(paragraphs)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
