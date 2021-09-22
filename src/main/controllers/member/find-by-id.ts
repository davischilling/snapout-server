import { FindMemberById, FindMemberByIdService } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindMemberByIdController extends Controller {
  constructor (
    private readonly findMemberByIdService: FindMemberByIdService
  ) {
    super()
  }

  async perform (params: FindMemberById.Input): Promise<HttpResponse<FindMemberById.Output>> {
    try {
      const member = await this.findMemberByIdService(params)
      return ok(member)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
