import { FindUsers, FindUsersService } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindUsersController extends Controller {
  constructor (
    private readonly findUsersService: FindUsersService
  ) {
    super()
  }

  async perform (params: FindUsers.Input): Promise<HttpResponse<FindUsers.Output>> {
    try {
      const users = await this.findUsersService(params)
      return ok(users)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
