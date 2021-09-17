import { FindProductByIdAndDeleteService } from '@/domain/use-cases/product'
import { Repository as ProductDbRepo } from '@/data/contracts/repos'
import { setupFindProductByIdAndDelete } from '@/data/services'

import mongoose from 'mongoose'
import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/product')

describe('FindProductByIdAndDeleteService', () => {
  let id: string
  let productAccountRepo: MockProxy<ProductDbRepo>
  let sut: FindProductByIdAndDeleteService

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    productAccountRepo = mock()
    productAccountRepo.findByIdAndDelete.mockResolvedValue(id)
  })

  beforeEach(() => {
    sut = setupFindProductByIdAndDelete(productAccountRepo)
  })

  it('should call ProductAccountRepo.findByIdAndDelete with correct params', async () => {
    await sut({ id })

    expect(productAccountRepo.findByIdAndDelete).toHaveBeenCalledWith(id)
    expect(productAccountRepo.findByIdAndDelete).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if ProductAccountRepo.findByIdAndDelete throws', async () => {
    productAccountRepo.findByIdAndDelete.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })

  it('should return the deleted product id on success', async () => {
    const productFindByIdResult = await sut({ id })

    expect(productFindByIdResult).toEqual({ id })
  })
})
