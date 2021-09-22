import { FindParagraphByIdAndDelete, FindParagraphByIdAndDeleteService } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindParagraphByIdAndDeleteController extends Controller {
  constructor (
    private readonly findParagraphByIdAndDeleteService: FindParagraphByIdAndDeleteService
  ) {
    super()
  }

  async perform (params: FindParagraphByIdAndDelete.Input): Promise<HttpResponse<FindParagraphByIdAndDelete.Output>> {
    try {
      const id = await this.findParagraphByIdAndDeleteService(params)
      return ok(id)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
