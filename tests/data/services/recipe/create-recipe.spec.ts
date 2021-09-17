import { Repository as RecipeDbRepo } from '@/data/contracts/repos'
import { Product, Recipe, RecipeItem, TypeOfMeal } from '@/data/entities'
import { setupCreateRecipe } from '@/data/services'
import { PortionTypes, ProductData, RecipeItemData, TypeOfMealData } from '@/domain/models'
import { CreateRecipe, CreateRecipeService } from '@/domain/use-cases/recipe'
import { ProductAttrs, ProductEntity as ProductRepoModel, RecipeItemAttrs, RecipeItemEntity as RecipeItemRepoModel, TypeOfMealAttrs, TypeOfMealEntity as TypeOfMealRepoModel } from '@/infra/mongodb/entities'
import { mock, MockProxy } from 'jest-mock-extended'
import { mocked } from 'ts-jest/utils'

import { closeDatabase, connect } from '@/tests/infra/mongodb/mocks'
import MongoMemoryServer from 'mongodb-memory-server-core'
import { Mongoose } from 'mongoose'

const makeNewProduct = async (product: ProductData): Promise<string> => {
    const productAttrs: ProductAttrs = new Product(product)
    const newProduct = ProductRepoModel.build(productAttrs)
    const saved = await newProduct.save()
    return saved._id.toString()
}

const makeNewRecipeItem = async (recipeItem: RecipeItemData): Promise<string> => {
    const recipeItemAttrs: RecipeItemAttrs = new RecipeItem(recipeItem)
    const newRecipeItem = RecipeItemRepoModel.build(recipeItemAttrs)
    const saved = await newRecipeItem.save()
    return saved._id.toString()
}

const makeNewTypeOfMeal = async (typeOfMeal: TypeOfMealData): Promise<string> => {
    const typeOfMealAttrs: TypeOfMealAttrs = new TypeOfMeal(typeOfMeal)
    const newTypeOfMeal = TypeOfMealRepoModel.build(typeOfMealAttrs)
    const saved = await newTypeOfMeal.save()
    return saved._id.toString()
}

jest.mock('@/data/entities/recipe')

describe('CreateRecipeService', () => {
    let mongoServer: MongoMemoryServer
    let mongoOrm: Mongoose
    let recipeAccountRepo: MockProxy<RecipeDbRepo>
    let createRecipeInput: CreateRecipe.RecipeInputs

    let sut: CreateRecipeService

    beforeAll(async () => {
        const db = await connect()
        mongoServer = db.mongoServer
        mongoOrm = db.mongoOrm
        recipeAccountRepo = mock()
        recipeAccountRepo.find.mockResolvedValue({ items: 0, data: [] })
        recipeAccountRepo.create.mockResolvedValue('recipe_id')

        let productData = {
            name: "Mock Product",
            fat: 2,
            carbohydrate: 2,
            protein: 2,
            portion: PortionTypes.grams,
            isConsumableAlone: true
        }
        const idProduct1 = await makeNewProduct(productData)
        let typeOfMealData = {
            name: "Mock Meal"
        }
        const idTypeOfMeal1 = await makeNewTypeOfMeal(typeOfMealData)
        let recipeItem = {
            productID: idProduct1,
            productYield: 2
        }
        const idRecipeItem1 = await makeNewRecipeItem(recipeItem)
        createRecipeInput = {
            products: [idRecipeItem1],
            meals: [idTypeOfMeal1]
        }
    })

    beforeEach(() => {
        sut = setupCreateRecipe(recipeAccountRepo)
    })

    afterAll(async () => {
      await closeDatabase({ mongoServer, mongoOrm })
    })


    it('should call RecipeRepo.create with Recipe entity', async () => {
        const RecipeStub = jest.fn().mockImplementation(() => ({ any: 'any' }))
        mocked(Recipe).mockImplementation(RecipeStub)

        await sut(createRecipeInput)

        expect(recipeAccountRepo.create).toHaveBeenCalledWith({ any: 'any' })
        expect(recipeAccountRepo.create).toHaveBeenCalledTimes(1)
    })

    it('should return an id on success', async () => {
        const recipeCreateResult = await sut(createRecipeInput)

        expect(recipeCreateResult).toEqual({ id: 'recipe_id' })
    })

    it('should rethrow if RecipeAccountRepo.create throws', async () => {
        recipeAccountRepo.create.mockRejectedValueOnce(new Error('repo_error'))

        const promise = sut(createRecipeInput)

        await expect(promise).rejects.toThrow(new Error('repo_error'))
    })
})
