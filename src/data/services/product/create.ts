import { Repository as ProductDbRepo } from '@/data/contracts/repos'
import { Product } from '@/data/entities'
import { CreateProductService } from '@/domain/use-cases/product'

type setup = (
  productRepo: ProductDbRepo,
) => CreateProductService

export const setupCreateProduct: setup = (productRepo) => async (params) => {
  const newProduct = new Product(params)
  const id = await productRepo.create(newProduct)
  return { id }
}
