import { Controller } from '@/application/controllers'
import { created, HttpResponse, unauthorized } from '@/application/helpers'
import { CreateUser, CreateUserService } from '@/domain/use-cases'

export class CreateUserController extends Controller {
  constructor (
    private readonly createUser: CreateUserService
  ) {
    super()
  }

  async perform (params: CreateUser.Input): Promise<HttpResponse<CreateUser.Output>> {
    try {
      const id = await this.createUser(params)
      return created(id)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
