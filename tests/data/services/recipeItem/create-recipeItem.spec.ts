import { Repository as RecipeItemDbRepo } from '@/data/contracts/repos'
import { RecipeItem } from '@/data/entities'
import { setupCreateRecipeItem } from '@/data/services'
import { PortionTypes, ProductData } from '@/domain/models'
import { ProductAttrs, ProductEntity as ProductRepoModel } from '@/infra/mongodb/entities'
import { Product } from '@/data/entities'
import { CreateRecipeItem, CreateRecipeItemService } from '@/domain/use-cases/recipeItem'
import { mock, MockProxy } from 'jest-mock-extended'
import { mocked } from 'ts-jest/utils'

import { closeDatabase, connect } from '@/tests/infra/mongodb/mocks'
import MongoMemoryServer from 'mongodb-memory-server-core'
import { Mongoose } from 'mongoose'

jest.mock('@/data/entities/recipeItem')

const makeNewProduct = async (product: ProductData): Promise<string> => {
    const productAttrs: ProductAttrs = new Product(product)
    const newProduct = ProductRepoModel.build(productAttrs)
    const saved = await newProduct.save()
    return saved._id.toString()
}

describe('CreateRecipeItemService', () => {
    let mongoServer: MongoMemoryServer
    let mongoOrm: Mongoose
    let recipeItemAccountRepo: MockProxy<RecipeItemDbRepo>
    let sut: CreateRecipeItemService
    let createRecipeItemInput: CreateRecipeItem.RecipeItemInputs

    beforeAll(async () => {
        const db = await connect()
        mongoServer = db.mongoServer
        mongoOrm = db.mongoOrm
        recipeItemAccountRepo = mock()
        recipeItemAccountRepo.find.mockResolvedValue({ items: 0, data: [] })
        recipeItemAccountRepo.create.mockResolvedValue('recipeItem_id')
        let productData = {
            name: "Mock Product",
            fat: 2,
            carbohydrate: 2,
            protein: 2,
            portion: PortionTypes.grams,
            isConsumableAlone: true
        }
        const idProduct1 = await makeNewProduct(productData)
        createRecipeItemInput = {
            productID: idProduct1,
            productYield: 2
        }
    })

    beforeEach(() => {
        sut = setupCreateRecipeItem(recipeItemAccountRepo)
    })

    afterAll(async () => {
        await closeDatabase({ mongoServer, mongoOrm })
    })


    it('should call RecipeItemRepo.create with RecipeItem entity', async () => {
        const RecipeItemStub = jest.fn().mockImplementation(() => ({ any: 'any' }))
        mocked(RecipeItem).mockImplementation(RecipeItemStub)

        await sut(createRecipeItemInput)

        expect(recipeItemAccountRepo.create).toHaveBeenCalledWith({ any: 'any' })
        expect(recipeItemAccountRepo.create).toHaveBeenCalledTimes(1)
    })

    it('should return an id on success', async () => {
        const recipeItemCreateResult = await sut(createRecipeItemInput)

        expect(recipeItemCreateResult).toEqual({ id: 'recipeItem_id' })
    })

    it('should rethrow if RecipeItemAccountRepo.create throws', async () => {
        recipeItemAccountRepo.create.mockRejectedValueOnce(new Error('repo_error'))

        const promise = sut(createRecipeItemInput)

        await expect(promise).rejects.toThrow(new Error('repo_error'))
    })
})
