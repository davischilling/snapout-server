import { Product, RecipeItem } from '@/data/entities'
import { PortionTypes, ProductData, RecipeItemData } from '@/domain/models'
import { ProductAttrs, ProductEntity as ProductRepoModel } from '@/infra/mongodb/entities'

import { closeDatabase, connect } from '@/tests/infra/mongodb/mocks'
import MongoMemoryServer from 'mongodb-memory-server-core'
import { Mongoose } from 'mongoose'

const makeNewProduct = async (product: ProductData): Promise<string> => {
    const productAttrs: ProductAttrs = new Product(product)
    const newProduct = ProductRepoModel.build(productAttrs)
    const saved = await newProduct.save()
    return saved._id.toString()
}

describe('Recipe', () => {
    let mongoServer: MongoMemoryServer
    let mongoOrm: Mongoose
    let recipeItemData: RecipeItemData
    let productData: ProductData
    let sut: RecipeItemData

    beforeAll(async () => {
        const db = await connect()
        mongoServer = db.mongoServer
        mongoOrm = db.mongoOrm
        productData = {
            name: "Mock Product",
            fat: 2,
            carbohydrate: 2,
            protein: 2,
            portion: PortionTypes.grams,
            isConsumableAlone: true
        }
        const idProduct1 = await makeNewProduct(productData)
        recipeItemData = {
            productID: idProduct1,
            productYield: 2
        }
    })

    afterAll(async () => {
        await closeDatabase({ mongoServer, mongoOrm })
    })

    it('should fill the attrs on the constructor with correct params', () => {
        sut = new RecipeItem(recipeItemData)

        recipeItemData.productID = sut.productID

        expect(sut).toEqual(recipeItemData)
    })

    it('should update an recipe correctly', () => {
        sut = new RecipeItem(recipeItemData)
        sut.id = 'any_recipe_id'

        const updatedRecipeItem = RecipeItem.update(sut, { productYield: 3 })
        sut.productYield = 3

        expect(updatedRecipeItem).toEqual(sut)
    })

})
