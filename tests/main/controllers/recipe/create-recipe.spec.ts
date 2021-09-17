import { UnauthorizedError } from '@/application/errors'
import { ProductEntity as ProductRepoModel, ProductAttrs } from '@/infra/mongodb/entities'
import { RecipeItemAttrs, RecipeItemEntity as RecipeItemRepoModel } from '@/infra/mongodb/entities'
import { TypeOfMealAttrs, TypeOfMealEntity as TypeOfMealRepoModel } from '@/infra/mongodb/entities'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { RecipeItem, Product, TypeOfMeal } from '@/data/entities'
import { PortionTypes, ProductData, RecipeItemData, TypeOfMealData } from '@/domain/models'
import { CreateRecipeController } from '@/main/controllers'

import { closeDatabase, connect } from '@/tests/infra/mongodb/mocks'
import MongoMemoryServer from 'mongodb-memory-server-core'
import { Mongoose } from 'mongoose'

type RecipeInputs = {
  products: string[]
  meals: string[]
}

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

describe('CreateRecipeController', () => {
  let mongoServer: MongoMemoryServer
  let mongoOrm: Mongoose
  let recipeInputs: RecipeInputs
  let productData: ProductData
  let recipeItemData: RecipeItemData
  let typeOfMealData: TypeOfMealData
  let createRecipe: jest.Mock
  let sut: CreateRecipeController
  let idProduct1: string
  let idTypeOfMeal1: string
  let idRecipeItem1: string

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
    idProduct1 = await makeNewProduct(productData)
    typeOfMealData = {
      name: "Mock Meal"
    }
    idTypeOfMeal1 = await makeNewTypeOfMeal(typeOfMealData)
    recipeItemData = {
      productID: idProduct1,
      productYield: 2
    }
    idRecipeItem1 = await makeNewRecipeItem(recipeItemData)
    recipeInputs = {
      products: [idRecipeItem1],
      meals: [idTypeOfMeal1]
    }
    createRecipe = jest.fn()
    createRecipe.mockResolvedValue({ id: 'recipe_id' })
  })

  beforeEach(() => {
    sut = new CreateRecipeController(createRecipe)
  })

  afterAll(async () => {
    await closeDatabase({ mongoServer, mongoOrm })
  })

  it('should call createRecipe with correct params', async () => {
    await sut.handle(recipeInputs)

    expect(createRecipe).toHaveBeenCalledWith(recipeInputs)
    expect(createRecipe).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if createRecipe fails', async () => {
    createRecipe.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(recipeInputs)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 201 and recipeID on success', async () => {
    const httpResponse = await sut.handle(recipeInputs)

    expect(httpResponse).toEqual({
      statusCode: 201,
      data: {
        id: 'recipe_id'
      }
    })
  })
})
