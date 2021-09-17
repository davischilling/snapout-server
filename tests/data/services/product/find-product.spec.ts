import { FindProductsService } from '@/domain/use-cases/product'
import { Repository as ProductDbRepo } from '@/data/contracts/repos'
import { setupFindProducts } from '@/data/services'

import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/product')

describe('FindProductsService', () => {
  let productAccountRepo: MockProxy<ProductDbRepo>
  let sut: FindProductsService

  beforeAll(() => {
    productAccountRepo = mock()
    productAccountRepo.find.mockResolvedValue({ items: 0, data: [] })
  })

  beforeEach(() => {
    sut = setupFindProducts(productAccountRepo)
  })

  it('should call ProductAccountRepo.find with correct params', async () => {
    await sut({ data: 'any' })

    expect(productAccountRepo.find).toHaveBeenCalledWith({ data: 'any' })
    expect(productAccountRepo.find).toHaveBeenCalledTimes(1)
  })

  it('should return an object with items and data properties on success', async () => {
    const productFindResult = await sut({})

    expect(productFindResult).toEqual({ items: 0, data: [] })
  })

  it('should rethrow if ProductAccountRepo.find throws', async () => {
    productAccountRepo.find.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({})

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })
})
