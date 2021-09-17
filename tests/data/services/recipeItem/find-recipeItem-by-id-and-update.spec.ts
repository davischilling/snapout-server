import { FindRecipeItemByIdAndUpdateService } from '@/domain/use-cases/recipeItem'
import { PortionTypes, ProductData, RecipeItemData } from '@/domain/models'
import { Repository as RecipeItemDbRepo } from '@/data/contracts/repos'
import { setupFindRecipeItemByIdAndUpdate } from '@/data/services'
import { Product, RecipeItem } from '@/data/entities'
import { ProductAttrs, ProductEntity as ProductRepoModel } from '@/infra/mongodb/entities'

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

describe('FindRecipeItemByIdAndUpdateService', () => {
  let mongoServer: MongoMemoryServer
  let mongoOrm: Mongoose
  let id: string
  let recipeItemAccountId: string
  let recipeItem: RecipeItemData
  let recipeItemAccountRepo: MockProxy<RecipeItemDbRepo>
  let spyRecipeItem: any
  let mockUpdatedRecipeItem: RecipeItem
  let sut: FindRecipeItemByIdAndUpdateService

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
    mockUpdatedRecipeItem = new RecipeItem(recipeItem)
    spyRecipeItem = jest.spyOn(RecipeItem, 'update').mockReturnValue(mockUpdatedRecipeItem)
  })

  beforeEach(() => {
    sut = setupFindRecipeItemByIdAndUpdate(recipeItemAccountRepo)
  })

  afterAll(async () => {
    await closeDatabase({ mongoServer, mongoOrm })
  })

  it('should call RecipeItemAccountRepo.findById with correct params', async () => {
    await sut({ data: 'any_data', id })

    expect(recipeItemAccountRepo.findById).toHaveBeenCalledWith(id)
    expect(recipeItemAccountRepo.findById).toHaveBeenCalledTimes(1)
  })

  it('should call RecipeItem entity update method with correct params', async () => {
    await sut({ data: 'any_data', id })

    expect(spyRecipeItem).toHaveBeenCalledWith(recipeItem, { data: 'any_data', id })
    expect(spyRecipeItem).toHaveBeenCalledTimes(1)
  })

  it('should call RecipeItemAccountRepo.findByIdAndUpdate with correct params', async () => {
    await sut({ data: 'any_data', id })

    expect(recipeItemAccountRepo.findByIdAndUpdate).toHaveBeenCalledWith(id, mockUpdatedRecipeItem)
    expect(recipeItemAccountRepo.findByIdAndUpdate).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if RecipeItemAccountRepo.findByIdAndUpdate throws', async () => {
    recipeItemAccountRepo.findByIdAndUpdate.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({ data: 'any_data', id })

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })

  it('should return an updated recipeItem on success', async () => {

    mockUpdatedRecipeItem.productYield = 3
    recipeItemAccountRepo.findByIdAndUpdate.mockResolvedValueOnce(mockUpdatedRecipeItem)

    const recipeItemFindByIdResult = await sut({ productYield: 3, id })

    expect(recipeItemFindByIdResult).toEqual(mockUpdatedRecipeItem)
  })
})
