import { FindProductsService } from '@/domain/use-cases/product'
import { Repository as ProductDbRepo } from '@/data/contracts/repos'

type setup = (
  productRepo: ProductDbRepo,
) => FindProductsService

export const setupFindProducts: setup = (productRepo) => async (params) => {
  return await productRepo.find(params)
}
