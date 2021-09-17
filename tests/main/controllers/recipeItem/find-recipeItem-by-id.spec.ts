import { FindRecipeItemByIdController } from '@/main/controllers'
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

describe('FindRecipeItemByIdController', () => {
  let mongoServer: MongoMemoryServer
  let mongoOrm: Mongoose
  let id: string
  let recipeItemAccountId: string
  let recipeItem: RecipeItemData
  let productData: ProductData
  let findRecipeItemByIdService: jest.Mock
  let sut: FindRecipeItemByIdController
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
    findRecipeItemByIdService = jest.fn()
    findRecipeItemByIdService.mockResolvedValue(recipeItem)
  })

  beforeEach(() => {
    sut = new FindRecipeItemByIdController(findRecipeItemByIdService)
  })

  afterAll(async () => {
    await closeDatabase({ mongoServer, mongoOrm })
  })

  it('should call findRecipeItemByIdService with correct params', async () => {
    await sut.handle(id)

    expect(findRecipeItemByIdService).toHaveBeenCalledWith(id)
    expect(findRecipeItemByIdService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findRecipeItemByIdService fails', async () => {
    findRecipeItemByIdService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findRecipeItemByIdService succeeds', async () => {
    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: recipeItem
    })
  })
})
