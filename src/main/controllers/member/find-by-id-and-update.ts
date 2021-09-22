import { FindMemberByIdAndUpdate, FindMemberByIdAndUpdateService } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindMemberByIdAndUpdateController extends Controller {
  constructor (
    private readonly findMemberByIdAndUpdateService: FindMemberByIdAndUpdateService
  ) {
    super()
  }

  async perform (params: FindMemberByIdAndUpdate.Input): Promise<HttpResponse<FindMemberByIdAndUpdate.Output>> {
    try {
      const member = await this.findMemberByIdAndUpdateService(params)
      return ok(member)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
