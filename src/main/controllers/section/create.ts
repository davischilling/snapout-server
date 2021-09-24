import { Controller } from '@/application/controllers'
import { created, HttpResponse, unauthorized } from '@/application/helpers'
import { CreateSection, CreateSectionService } from '@/domain/use-cases'

export class CreateSectionController extends Controller {
  constructor (
    private readonly createSection: CreateSectionService
  ) {
    super()
  }

  async perform (params: CreateSection.Input): Promise<HttpResponse<CreateSection.Output>> {
    try {
      const id = await this.createSection(params)
      return created(id)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
