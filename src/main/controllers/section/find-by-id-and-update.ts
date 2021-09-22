import { FindSectionByIdAndUpdate, FindSectionByIdAndUpdateService } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindSectionByIdAndUpdateController extends Controller {
  constructor (
    private readonly findSectionByIdAndUpdateService: FindSectionByIdAndUpdateService
  ) {
    super()
  }

  async perform (params: FindSectionByIdAndUpdate.Input): Promise<HttpResponse<FindSectionByIdAndUpdate.Output>> {
    try {
      const section = await this.findSectionByIdAndUpdateService(params)
      return ok(section)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
