import { FindProductsService } from '@/domain/use-cases/product'
import { setupFindProducts } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'

export const makeFindProducts = async (): Promise<FindProductsService> => {
  const productRepo = await makeMongoDbRepository('product')
  return setupFindProducts(productRepo)
}
