import { FindProductByIdService } from '@/domain/use-cases/product'
import { Repository as ProductDbRepo } from '@/data/contracts/repos'

type setup = (
  productRepo: ProductDbRepo,
) => FindProductByIdService

export const setupFindProductById: setup = (productRepo) => async ({ id }) => {
  return await productRepo.findById(id)
}
