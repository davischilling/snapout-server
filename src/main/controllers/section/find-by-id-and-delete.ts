import { FindSectionByIdAndDelete, FindSectionByIdAndDeleteService } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindSectionByIdAndDeleteController extends Controller {
  constructor (
    private readonly findSectionByIdAndDeleteService: FindSectionByIdAndDeleteService
  ) {
    super()
  }

  async perform (params: FindSectionByIdAndDelete.Input): Promise<HttpResponse<FindSectionByIdAndDelete.Output>> {
    try {
      const id = await this.findSectionByIdAndDeleteService(params)
      return ok(id)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
