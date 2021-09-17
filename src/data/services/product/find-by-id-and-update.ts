import { FindProductByIdAndUpdateService } from '@/domain/use-cases/product'
import { Repository as ProductDbRepo } from '@/data/contracts/repos'
import { Product } from '@/data/entities'

type setup = (
  productRepo: ProductDbRepo,
) => FindProductByIdAndUpdateService

export const setupFindProductByIdAndUpdate: setup = (productRepo) => async params => {
  const product: Product = await productRepo.findById(params.id)
  const updatedProduct = Product.update(product, params)
  return await productRepo.findByIdAndUpdate(params.id, updatedProduct)
}
