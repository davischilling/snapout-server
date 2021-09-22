import { Controller } from '@/application/controllers'
import { created, HttpResponse, unauthorized } from '@/application/helpers'
import { CreateMember, CreateMemberService } from '@/domain/use-cases'

export class CreateMemberController extends Controller {
  constructor (
    private readonly createMember: CreateMemberService
  ) {
    super()
  }

  async perform (params: CreateMember.Input): Promise<HttpResponse<CreateMember.Output>> {
    try {
      const id = await this.createMember(params)
      return created(id)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
