import { Product, RecipeItem } from '@/data/entities'
import { PortionTypes, ProductData, RecipeItemData } from '@/domain/models'
import { ProductAttrs, ProductEntity as ProductRepoModel, RecipeItemAttrs, RecipeItemEntity as RecipeItemRepoModel } from '@/infra/mongodb/entities'
import { MongoDbRepository } from '@/infra/mongodb/repos'
import { clearDatabase, closeDatabase, connect } from '@/tests/infra/mongodb/mocks'
import MongoMemoryServer from 'mongodb-memory-server-core'
import { Mongoose } from 'mongoose'


const makeNewRecipeItem = async (recipeItem: RecipeItemData): Promise<string> => {
  const recipeItemAttrs: RecipeItemAttrs = new RecipeItem(recipeItem)
  const newRecipeItem = RecipeItemRepoModel.build(recipeItemAttrs)
  const saved = await newRecipeItem.save()
  return saved._id.toString()
}

const makeNewProduct = async (product: ProductData): Promise<string> => {
  const productAttrs: ProductAttrs = new Product(product)
  const newProduct = ProductRepoModel.build(productAttrs)
  const saved = await newProduct.save()
  return saved._id.toString()
}

describe('MongoDbRepository', () => {
  let mongoServer: MongoMemoryServer
  let mongoOrm: Mongoose
  let recipeItemData: RecipeItemData
  let recipeItem: RecipeItem
  let sut: MongoDbRepository

  beforeAll(async () => {
    const db = await connect()
    mongoServer = db.mongoServer
    mongoOrm = db.mongoOrm
    let productData = {
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
    recipeItem = new RecipeItem(recipeItemData)
  })

  afterAll(async () => {
    await closeDatabase({ mongoServer, mongoOrm })
  })

  beforeEach(async () => {
    await clearDatabase(mongoOrm.connection.collections)
    sut = await MongoDbRepository.init('@/infra/mongodb/entities', 'recipeItem')
  })

  describe('create', () => {
    it('should create an recipeItem and return an id', async () => {
      const id = await sut.create(recipeItem)

      const createdRecipeItem = await RecipeItemRepoModel.findById({ _id: id })

      expect(createdRecipeItem).toBeDefined()
    })
  })

  describe('find', () => {
    it('should return a list of recipeItems', async () => {
      const idRecipeItem1 = await makeNewRecipeItem(recipeItem)
      const idRecipeItem2 = await makeNewRecipeItem(recipeItem)

      const recipeItems = await sut.find({})

      expect(recipeItems.items).toBe(2)
      expect(recipeItems.data[0].id).toBe(idRecipeItem1)
      expect(recipeItems.data[1].id).toBe(idRecipeItem2)
    })

  })

  describe('findById', () => {
    it('should return an recipeItem', async () => {
      const recipeItemId = await makeNewRecipeItem(recipeItem)

      const recipeItemFound = await sut.findById(recipeItemId)

      expect(recipeItemFound.id).toBe(recipeItemId)
    })
  })

  describe('findByIdAndUpdate', () => {
    it('should findById and update an recipeItem', async () => {
      const recipeItemId = await makeNewRecipeItem(recipeItem)

      const recipeItemFound = await sut.findByIdAndUpdate(recipeItemId, { productYield: 3 })

      expect(recipeItemFound.productYield).toBe(3)
    })
  })

  describe('findByIdAndDelete', () => {
    it('should findById and delete an recipeItem', async () => {
      const recipeItemId = await makeNewRecipeItem(recipeItem)
      const recipeItemsFind1 = await sut.find({})

      const recipeItemDeletedId = await sut.findByIdAndDelete(recipeItemId)
      const recipeItemsFind2 = await sut.find({})

      expect(recipeItemId).toBe(recipeItemDeletedId)
      expect(recipeItemsFind1.items).toBe(1)
      expect(recipeItemsFind2.items).toBe(0)
    })
  })
})
