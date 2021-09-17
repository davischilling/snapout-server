import { FindRecipeByIdAndUpdateController } from '@/main/controllers'
import { PortionTypes, RecipeData, ProductData, RecipeItemData, TypeOfMealData } from '@/domain/models'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { ProductEntity as ProductRepoModel, ProductAttrs } from '@/infra/mongodb/entities'
import { RecipeItemAttrs, RecipeItemEntity as RecipeItemRepoModel } from '@/infra/mongodb/entities'
import { TypeOfMealAttrs, TypeOfMealEntity as TypeOfMealRepoModel } from '@/infra/mongodb/entities'
import { RecipeItem, Product, TypeOfMeal } from '@/data/entities'
import { UnauthorizedError } from '@/application/errors'

import { closeDatabase, connect } from '@/tests/infra/mongodb/mocks'
import MongoMemoryServer from 'mongodb-memory-server-core'
import { Mongoose } from 'mongoose'
import mongoose from 'mongoose'

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

describe('FindRecipeByIdAndUpdateController', () => {
  let mongoServer: MongoMemoryServer
  let mongoOrm: Mongoose
  let id: string
  let recipeAccountId: string
  let recipe: RecipeData
  let productData: ProductData
  let recipeItemData: RecipeItemData
  let typeOfMealData: TypeOfMealData
  let findRecipeByIdAndUpdateService: jest.Mock
  let sut: FindRecipeByIdAndUpdateController
  let idProduct1: string
  let idTypeOfMeal1: string
  let idRecipeItem1: string

  beforeAll(async () => {
    const db = await connect()
    mongoServer = db.mongoServer
    mongoOrm = db.mongoOrm
    id = new mongoose.Types.ObjectId().toHexString()
    recipeAccountId = new mongoose.Types.ObjectId().toHexString()
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
    recipe = {
      id,
      products: [idRecipeItem1],
      meals: [idTypeOfMeal1]
    }
    findRecipeByIdAndUpdateService = jest.fn()
    findRecipeByIdAndUpdateService.mockResolvedValue(recipe)
  })

  beforeEach(() => {
    sut = new FindRecipeByIdAndUpdateController(findRecipeByIdAndUpdateService)
  })

  afterAll(async () => {
    await closeDatabase({ mongoServer, mongoOrm })
  })

  it('should call findRecipeByIdAndUpdateService with correct params', async () => {
    await sut.handle({ params: { data: 'any_data', id } })

    expect(findRecipeByIdAndUpdateService).toHaveBeenCalledWith({ params: { data: 'any_data', id } })
    expect(findRecipeByIdAndUpdateService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findRecipeByIdAndUpdateService fails', async () => {
    findRecipeByIdAndUpdateService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle({ params: { data: 'any_data', id } })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findRecipeByIdAndUpdateService succeeds', async () => {
    const httpResponse = await sut.handle({ params: { data: 'any_data', id } })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: recipe
    })
  })
})
