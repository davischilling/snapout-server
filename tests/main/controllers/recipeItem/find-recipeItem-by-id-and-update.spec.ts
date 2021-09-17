import { FindRecipeItemByIdAndUpdateController } from '@/main/controllers'
import { PortionTypes, ProductData, RecipeItemData } from '@/domain/models'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'
import { ProductAttrs, ProductEntity as ProductRepoModel } from '@/infra/mongodb/entities'
import { Product } from '@/data/entities'

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

describe('FindRecipeItemByIdAndUpdateController', () => {
  let mongoServer: MongoMemoryServer
  let mongoOrm: Mongoose
  let id: string
  let recipeItemAccountId: string
  let recipeItem: RecipeItemData
  let productData: ProductData
  let findRecipeItemByIdAndUpdateService: jest.Mock
  let sut: FindRecipeItemByIdAndUpdateController
  let idProduct1: string

  beforeAll(async () => {
    const db = await connect()
    mongoServer = db.mongoServer
    mongoOrm = db.mongoOrm
    id = new mongoose.Types.ObjectId().toHexString()
    recipeItemAccountId = new mongoose.Types.ObjectId().toHexString()
    productData = {
      name: "Mock Product",
      fat: 2,
      carbohydrate: 2,
      protein: 2,
      portion: PortionTypes.grams,
      isConsumableAlone: true
    }
    idProduct1 = await makeNewProduct(productData)
    recipeItem = {
      id,
      productID: idProduct1,
      productYield: 2
    }
    findRecipeItemByIdAndUpdateService = jest.fn()
    findRecipeItemByIdAndUpdateService.mockResolvedValue(recipeItem)
  })

  beforeEach(() => {
    sut = new FindRecipeItemByIdAndUpdateController(findRecipeItemByIdAndUpdateService)
  })

  afterAll(async () => {
    await closeDatabase({ mongoServer, mongoOrm })
  })

  it('should call findRecipeItemByIdAndUpdateService with correct params', async () => {
    await sut.handle({ params: { data: 'any_data', id } })

    expect(findRecipeItemByIdAndUpdateService).toHaveBeenCalledWith({ params: { data: 'any_data', id } })
    expect(findRecipeItemByIdAndUpdateService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findRecipeItemByIdAndUpdateService fails', async () => {
    findRecipeItemByIdAndUpdateService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle({ params: { data: 'any_data', id } })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findRecipeItemByIdAndUpdateService succeeds', async () => {
    const httpResponse = await sut.handle({ params: { data: 'any_data', id } })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: recipeItem
    })
  })
})
