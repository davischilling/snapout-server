import { FindProductByIdAndUpdateService } from '@/domain/use-cases/product'
import { setupFindProductByIdAndUpdate } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'

export const makeFindProductByIdAndUpdate = async (): Promise<FindProductByIdAndUpdateService> => {
  const productRepo = await makeMongoDbRepository('product')
  return setupFindProductByIdAndUpdate(productRepo)
}
