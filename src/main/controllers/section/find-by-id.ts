import { FindSectionById, FindSectionByIdService } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindSectionByIdController extends Controller {
  constructor (
    private readonly findSectionByIdService: FindSectionByIdService
  ) {
    super()
  }

  async perform (params: FindSectionById.Input): Promise<HttpResponse<FindSectionById.Output>> {
    try {
      const section = await this.findSectionByIdService(params)
      return ok(section)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
