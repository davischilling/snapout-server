import { FindMembers, FindMembersService } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindMembersController extends Controller {
  constructor (
    private readonly findMembersService: FindMembersService
  ) {
    super()
  }

  async perform (params: FindMembers.Input): Promise<HttpResponse<FindMembers.Output>> {
    try {
      const members = await this.findMembersService(params)
      return ok(members)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
