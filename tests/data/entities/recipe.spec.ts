import { RecipeItem, Recipe, Product, TypeOfMeal } from '@/data/entities'
import { ProductEntity as ProductRepoModel, ProductAttrs } from '@/infra/mongodb/entities'
import { RecipeItemAttrs, RecipeItemEntity as RecipeItemRepoModel } from '@/infra/mongodb/entities'
import { TypeOfMealAttrs, TypeOfMealEntity as TypeOfMealRepoModel } from '@/infra/mongodb/entities'
import { ProductData, TypeOfMealData, RecipeData, RecipeItemData, PortionTypes } from '@/domain/models'

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

describe('Recipe', () => {
    let mongoServer: MongoMemoryServer
    let mongoOrm: Mongoose
    let recipeData: RecipeData
    let recipeItemData: RecipeItemData
    let productData: ProductData
    let typeOfMealData: TypeOfMealData
    let sut: Recipe

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
        typeOfMealData = {
            name: "Mock Meal"
        }
        const idTypeOfMeal1 = await makeNewTypeOfMeal(typeOfMealData)
        recipeItemData = {
            productID: idProduct1,
            productYield: 2
        }
        const idRecipeItem1 = await makeNewRecipeItem(recipeItemData)
        recipeData = {
            products: [idRecipeItem1],
            meals: [idTypeOfMeal1]
        }
    })

    afterAll(async () => {
        await closeDatabase({ mongoServer, mongoOrm })
    })

    it('should fill the attrs on the constructor with correct params', () => {
        sut = new Recipe(recipeData)

        recipeData.products = sut.products

        expect(sut).toEqual(recipeData)
    })

    it('should update an recipe correctly', async () => {
        sut = new Recipe(recipeData)
        sut.id = 'any_recipe_id'


        const idProduct1 = await makeNewProduct(productData)

        let updateRrecipeItemData = {
            productID: idProduct1,
            productYield: 4
        }
        const idRecipeItem1 = await makeNewRecipeItem(updateRrecipeItemData)

        const updatedRecipe = Recipe.update(sut, { products: [idRecipeItem1] })
        sut.products = [idRecipeItem1]

        expect(updatedRecipe).toEqual(sut)
    })

})
