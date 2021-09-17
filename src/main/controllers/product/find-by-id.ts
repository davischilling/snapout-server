import { FindProductById, FindProductByIdService } from '@/domain/use-cases/product'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindProductByIdController extends Controller {
  constructor (
    private readonly findProductByIdService: FindProductByIdService
  ) {
    super()
  }

  async perform (params: FindProductById.Input): Promise<HttpResponse<FindProductById.Output>> {
    try {
      const product = await this.findProductByIdService(params)
      return ok(product)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
