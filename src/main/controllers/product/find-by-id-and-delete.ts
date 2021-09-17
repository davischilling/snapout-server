import { FindProductByIdAndDelete, FindProductByIdAndDeleteService } from '@/domain/use-cases/product'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindProductByIdAndDeleteController extends Controller {
  constructor (
    private readonly findProductByIdAndDeleteService: FindProductByIdAndDeleteService
  ) {
    super()
  }

  async perform (params: FindProductByIdAndDelete.Input): Promise<HttpResponse<FindProductByIdAndDelete.Output>> {
    try {
      const id = await this.findProductByIdAndDeleteService(params)
      return ok(id)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
