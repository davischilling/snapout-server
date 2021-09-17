import { FindProductByIdAndUpdateService } from '@/domain/use-cases/product'
import { PortionTypes, ProductData } from '@/domain/models'
import { Repository as ProductDbRepo } from '@/data/contracts/repos'
import { setupFindProductByIdAndUpdate } from '@/data/services'
import { Product } from '@/data/entities'

import mongoose from 'mongoose'
import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/product')

describe('FindProductByIdAndUpdateService', () => {
  let id: string
  let product: ProductData
  let productAccountRepo: MockProxy<ProductDbRepo>
  let spyProduct: any
  let mockUpdatedProduct: Product
  let sut: FindProductByIdAndUpdateService

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    product = {
      id,
      name: "Mock Product",
        fat: 2,
        carbohydrate: 2,
        protein: 2,
        portion: PortionTypes.grams,
        isConsumableAlone: true
    }
    productAccountRepo = mock()
    productAccountRepo.findById.mockResolvedValue(product)
    mockUpdatedProduct = new Product(product)
    spyProduct = jest.spyOn(Product, 'update').mockReturnValue(mockUpdatedProduct)
  })

  beforeEach(() => {
    sut = setupFindProductByIdAndUpdate(productAccountRepo)
  })

  it('should call ProductAccountRepo.findById with correct params', async () => {
    await sut({ data: 'any_data', id })

    expect(productAccountRepo.findById).toHaveBeenCalledWith(id)
    expect(productAccountRepo.findById).toHaveBeenCalledTimes(1)
  })

  it('should call Product entity update method with correct params', async () => {
    await sut({ data: 'any_data', id })

    expect(spyProduct).toHaveBeenCalledWith(product, { data: 'any_data', id })
    expect(spyProduct).toHaveBeenCalledTimes(1)
  })

  it('should call ProductAccountRepo.findByIdAndUpdate with correct params', async () => {
    await sut({ data: 'any_data', id })

    expect(productAccountRepo.findByIdAndUpdate).toHaveBeenCalledWith(id, mockUpdatedProduct)
    expect(productAccountRepo.findByIdAndUpdate).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if ProductAccountRepo.findByIdAndUpdate throws', async () => {
    productAccountRepo.findByIdAndUpdate.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({ data: 'any_data', id })

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })

  it('should return an updated product on success', async () => {
    mockUpdatedProduct.fat = 3
    productAccountRepo.findByIdAndUpdate.mockResolvedValueOnce(mockUpdatedProduct)

    const productFindByIdResult = await sut({ fat: 3, id })

    expect(productFindByIdResult).toEqual(mockUpdatedProduct)
  })
})
