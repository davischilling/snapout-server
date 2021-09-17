import { Repository as ProductDbRepo } from '@/data/contracts/repos'
import { Product } from '@/data/entities'
import { setupCreateProduct } from '@/data/services'
import { PortionTypes } from '@/domain/models'
import { CreateProduct, CreateProductService } from '@/domain/use-cases/product'
import { mock, MockProxy } from 'jest-mock-extended'
import { mocked } from 'ts-jest/utils'

jest.mock('@/data/entities/product')

describe('CreateProductService', () => {
    let productAccountRepo: MockProxy<ProductDbRepo>
    const createProductInput: CreateProduct.ProductInputs = {
        name: "Mock Product",
        fat: 2,
        carbohydrate: 2,
        protein: 2,
        portion: PortionTypes.grams,
        isConsumableAlone: true
    }
    let sut: CreateProductService

    beforeAll(() => {
        productAccountRepo = mock()
        productAccountRepo.find.mockResolvedValue({ items: 0, data: [] })
        productAccountRepo.create.mockResolvedValue('product_id')
    })

    beforeEach(() => {
        sut = setupCreateProduct(productAccountRepo)
    })


    it('should call ProductRepo.create with Product entity', async () => {
        const ProductStub = jest.fn().mockImplementation(() => ({ any: 'any' }))
        mocked(Product).mockImplementation(ProductStub)

        await sut(createProductInput)

        expect(productAccountRepo.create).toHaveBeenCalledWith({ any: 'any' })
        expect(productAccountRepo.create).toHaveBeenCalledTimes(1)
    })

    it('should return an id on success', async () => {
        const productCreateResult = await sut(createProductInput)

        expect(productCreateResult).toEqual({ id: 'product_id' })
    })

    it('should rethrow if ProductAccountRepo.create throws', async () => {
        productAccountRepo.create.mockRejectedValueOnce(new Error('repo_error'))

        const promise = sut(createProductInput)

        await expect(promise).rejects.toThrow(new Error('repo_error'))
    })
})
