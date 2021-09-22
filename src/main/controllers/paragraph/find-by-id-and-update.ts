import { FindParagraphByIdAndUpdate, FindParagraphByIdAndUpdateService } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindParagraphByIdAndUpdateController extends Controller {
  constructor (
    private readonly findParagraphByIdAndUpdateService: FindParagraphByIdAndUpdateService
  ) {
    super()
  }

  async perform (params: FindParagraphByIdAndUpdate.Input): Promise<HttpResponse<FindParagraphByIdAndUpdate.Output>> {
    try {
      const paragraph = await this.findParagraphByIdAndUpdateService(params)
      return ok(paragraph)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
