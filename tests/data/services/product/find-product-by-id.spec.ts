import { PortionTypes, ProductData } from '@/domain/models'
import { FindProductByIdService } from '@/domain/use-cases/product'
import { Repository as ProductDbRepo } from '@/data/contracts/repos'
import { setupFindProductById } from '@/data/services'

import mongoose from 'mongoose'
import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/product')

describe('FindProductByIdService', () => {
  let id: string
  let product: ProductData
  let productAccountRepo: MockProxy<ProductDbRepo>
  let sut: FindProductByIdService

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
  })

  beforeEach(() => {
    sut = setupFindProductById(productAccountRepo)
  })

  it('should call ProductAccountRepo.findById with correct params', async () => {
    await sut({ id })

    expect(productAccountRepo.findById).toHaveBeenCalledWith(id)
    expect(productAccountRepo.findById).toHaveBeenCalledTimes(1)
  })

  it('should return an product on success', async () => {
    const productFindByIdResult = await sut({ id })

    expect(productFindByIdResult).toEqual(product)
  })

  it('should rethrow if ProductAccountRepo.findById throws', async () => {
    productAccountRepo.findById.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })
})
