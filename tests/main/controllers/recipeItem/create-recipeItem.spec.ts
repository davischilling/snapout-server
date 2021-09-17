import { UnauthorizedError } from '@/application/errors'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { ProductData, PortionTypes } from '@/domain/models'
import { CreateRecipeItemController } from '@/main/controllers'
import { ProductAttrs, ProductEntity as ProductRepoModel } from '@/infra/mongodb/entities'
import { Product } from '@/data/entities'

import { closeDatabase, connect } from '@/tests/infra/mongodb/mocks'
import MongoMemoryServer from 'mongodb-memory-server-core'
import { Mongoose } from 'mongoose'

type RecipeItemInputs = {
  productID: string
  productYield: number
}

const makeNewProduct = async (product: ProductData): Promise<string> => {
  const productAttrs: ProductAttrs = new Product(product)
  const newProduct = ProductRepoModel.build(productAttrs)
  const saved = await newProduct.save()
  return saved._id.toString()
}

describe('CreateRecipeItemController', () => {
  let mongoServer: MongoMemoryServer
  let mongoOrm: Mongoose
  let recipeItemInputs: RecipeItemInputs
  let createRecipeItem: jest.Mock
  let productData: ProductData
  let sut: CreateRecipeItemController
  let idProduct1: string

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
    recipeItemInputs = {
      productID: idProduct1,
      productYield: 2
    }
    createRecipeItem = jest.fn()
    createRecipeItem.mockResolvedValue({ id: 'recipeItem_id' })
  })

  beforeEach(() => {
    sut = new CreateRecipeItemController(createRecipeItem)
  })

  afterAll(async () => {
    await closeDatabase({ mongoServer, mongoOrm })
  })

  it('should call createRecipeItem with correct params', async () => {
    await sut.handle(recipeItemInputs)

    expect(createRecipeItem).toHaveBeenCalledWith(recipeItemInputs)
    expect(createRecipeItem).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if createRecipeItem fails', async () => {
    createRecipeItem.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(recipeItemInputs)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 201 and recipeItemID on success', async () => {
    const httpResponse = await sut.handle(recipeItemInputs)

    expect(httpResponse).toEqual({
      statusCode: 201,
      data: {
        id: 'recipeItem_id'
      }
    })
  })
})
