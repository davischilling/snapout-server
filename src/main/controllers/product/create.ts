import { Controller } from '@/application/controllers'
import { created, HttpResponse, unauthorized } from '@/application/helpers'
import { CreateProduct, CreateProductService } from '@/domain/use-cases/product'

export class CreateProductController extends Controller {
  constructor (
    private readonly createProduct: CreateProductService
  ) {
    super()
  }

  async perform (params: CreateProduct.input): Promise<HttpResponse<CreateProduct.output>> {
    try {
      const id = await this.createProduct(params)
      return created(id)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }

  
}
