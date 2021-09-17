import { CreateProductController } from '@/main/controllers'
import { makeCreateProduct } from '@/main/factories/services'

export const makeCreateProductController = async (): Promise<CreateProductController> => {
  const createProductService = await makeCreateProduct()
  return new CreateProductController(createProductService)
}
