import { FindProductByIdAndDeleteService } from '@/domain/use-cases/product'
import { Repository as ProductDbRepo } from '@/data/contracts/repos'

type setup = (
  productRepo: ProductDbRepo,
) => FindProductByIdAndDeleteService

export const setupFindProductByIdAndDelete: setup = (productRepo) => async ({ id }) => {
  const deletedProductId = await productRepo.findByIdAndDelete(id)
  return { id: deletedProductId }
}
