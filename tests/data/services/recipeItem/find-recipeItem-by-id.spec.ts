import { PortionTypes, ProductData, RecipeItemData } from '@/domain/models'
import { FindRecipeItemByIdService } from '@/domain/use-cases/recipeItem'
import { Repository as RecipeItemDbRepo } from '@/data/contracts/repos'
import { setupFindRecipeItemById } from '@/data/services'
import { ProductAttrs, ProductEntity as ProductRepoModel } from '@/infra/mongodb/entities'
import { Product } from '@/data/entities'

import { closeDatabase, connect } from '@/tests/infra/mongodb/mocks'
import MongoMemoryServer from 'mongodb-memory-server-core'
import { Mongoose } from 'mongoose'
import mongoose from 'mongoose'
import { mock, MockProxy } from 'jest-mock-extended'

const makeNewProduct = async (product: ProductData): Promise<string> => {
  const productAttrs: ProductAttrs = new Product(product)
  const newProduct = ProductRepoModel.build(productAttrs)
  const saved = await newProduct.save()
  return saved._id.toString()
}

jest.mock('@/data/entities/recipeItem')

describe('FindRecipeItemByIdService', () => {
  let mongoServer: MongoMemoryServer
  let mongoOrm: Mongoose
  let id: string
  let recipeItemAccountId: string
  let recipeItem: RecipeItemData
  let recipeItemAccountRepo: MockProxy<RecipeItemDbRepo>
  let sut: FindRecipeItemByIdService

  beforeAll(async () => {
    const db = await connect()
    mongoServer = db.mongoServer
    mongoOrm = db.mongoOrm
    id = new mongoose.Types.ObjectId().toHexString()
    recipeItemAccountId = new mongoose.Types.ObjectId().toHexString()
    let productData = {
      name: "Mock Product",
      fat: 2,
      carbohydrate: 2,
      protein: 2,
      portion: PortionTypes.grams,
      isConsumableAlone: true
    }
    const idProduct1 = await makeNewProduct(productData)
    recipeItem = {
      id,
      productID: idProduct1,
      productYield: 2
    }
    recipeItemAccountRepo = mock()
    recipeItemAccountRepo.findById.mockResolvedValue(recipeItem)
  })

  beforeEach(() => {
    sut = setupFindRecipeItemById(recipeItemAccountRepo)
  })

  afterAll(async () => {
    await closeDatabase({ mongoServer, mongoOrm })
  })

  it('should call RecipeItemAccountRepo.findById with correct params', async () => {
    await sut({ id })

    expect(recipeItemAccountRepo.findById).toHaveBeenCalledWith(id)
    expect(recipeItemAccountRepo.findById).toHaveBeenCalledTimes(1)
  })

  it('should return an recipeItem on success', async () => {
    const recipeItemFindByIdResult = await sut({ id })

    expect(recipeItemFindByIdResult).toEqual(recipeItem)
  })

  it('should rethrow if RecipeItemAccountRepo.findById throws', async () => {
    recipeItemAccountRepo.findById.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })
})
