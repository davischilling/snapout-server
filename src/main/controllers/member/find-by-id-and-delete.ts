import { FindMemberByIdAndDelete, FindMemberByIdAndDeleteService } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindMemberByIdAndDeleteController extends Controller {
  constructor (
    private readonly findMemberByIdAndDeleteService: FindMemberByIdAndDeleteService
  ) {
    super()
  }

  async perform (params: FindMemberByIdAndDelete.Input): Promise<HttpResponse<FindMemberByIdAndDelete.Output>> {
    try {
      const id = await this.findMemberByIdAndDeleteService(params)
      return ok(id)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
