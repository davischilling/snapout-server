import { FindProducts, FindProductsService } from '@/domain/use-cases/product'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindProductsController extends Controller {
  constructor (
    private readonly findProductsService: FindProductsService
  ) {
    super()
  }

  async perform (params: FindProducts.Input): Promise<HttpResponse<FindProducts.Output>> {
    try {
      const products = await this.findProductsService(params)
      return ok(products)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
