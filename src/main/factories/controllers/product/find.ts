import { FindProductsController } from '@/main/controllers'
import { makeFindProducts } from '@/main/factories/services'

export const makeFindProductsController = async (): Promise<FindProductsController> => {
  const findProductsService = await makeFindProducts()
  return new FindProductsController(findProductsService)
}
