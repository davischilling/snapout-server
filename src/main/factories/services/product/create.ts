import { CreateProductService } from '@/domain/use-cases/product'
import { setupCreateProduct } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'

export const makeCreateProduct = async (): Promise<CreateProductService> => {
  const productRepo = await makeMongoDbRepository('product')
  return setupCreateProduct(productRepo)
}
