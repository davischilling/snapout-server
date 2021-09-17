import { FindProductByIdAndUpdate, FindProductByIdAndUpdateService } from '@/domain/use-cases/product'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindProductByIdAndUpdateController extends Controller {
  constructor (
    private readonly findProductByIdAndUpdateService: FindProductByIdAndUpdateService
  ) {
    super()
  }

  async perform (params: FindProductByIdAndUpdate.Input): Promise<HttpResponse<FindProductByIdAndUpdate.Output>> {
    try {
      const product = await this.findProductByIdAndUpdateService(params)
      return ok(product)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
