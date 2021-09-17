import { FindProductByIdAndDeleteService } from '@/domain/use-cases/product'
import { setupFindProductByIdAndDelete } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'

export const makeFindProductByIdAndDelete = async (): Promise<FindProductByIdAndDeleteService> => {
  const productRepo = await makeMongoDbRepository('product')
  return setupFindProductByIdAndDelete(productRepo)
}
