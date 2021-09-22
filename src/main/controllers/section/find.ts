import { FindSections, FindSectionsService } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindSectionsController extends Controller {
  constructor (
    private readonly findSectionsService: FindSectionsService
  ) {
    super()
  }

  async perform (params: FindSections.Input): Promise<HttpResponse<FindSections.Output>> {
    try {
      const sections = await this.findSectionsService(params)
      return ok(sections)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
