import { FindProductByIdService } from '@/domain/use-cases/product'
import { setupFindProductById } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'

export const makeFindProductById = async (): Promise<FindProductByIdService> => {
  const productRepo = await makeMongoDbRepository('product')
  return setupFindProductById(productRepo)
}
