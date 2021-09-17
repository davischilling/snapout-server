import { Product } from '@/data/entities'
import { PortionTypes, ProductData } from '@/domain/models'
import { ProductAttrs, ProductEntity as ProductRepoModel } from '@/infra/mongodb/entities'
import { MongoDbRepository } from '@/infra/mongodb/repos'
import { clearDatabase, closeDatabase, connect } from '@/tests/infra/mongodb/mocks'

import MongoMemoryServer from 'mongodb-memory-server-core'
import { Mongoose } from 'mongoose'

const makeNewProduct = async (product: ProductData): Promise<string> => {
  const productAttrs: ProductAttrs = new Product(product)
  const newProduct = ProductRepoModel.build(productAttrs)
  const saved = await newProduct.save()
  return saved._id.toString()
}

describe('MongoDbRepository', () => {
  let mongoServer: MongoMemoryServer
  let mongoOrm: Mongoose
  let productData: ProductData
  let product: Product
  let sut: MongoDbRepository

  beforeAll(async () => {
    productData = {
      name: "Mock Product",
      fat: 2,
      carbohydrate: 2,
      protein: 2,
      portion: PortionTypes.grams,
      isConsumableAlone: true
    }
    product = new Product(productData)
    const db = await connect()
    mongoServer = db.mongoServer
    mongoOrm = db.mongoOrm
  })

  afterAll(async () => {
    await closeDatabase({ mongoServer, mongoOrm })
  })

  beforeEach(async () => {
    await clearDatabase(mongoOrm.connection.collections)
    sut = await MongoDbRepository.init('@/infra/mongodb/entities', 'product')
  })

  describe('create', () => {
    it('should create an product and return an id', async () => {
      const id = await sut.create(product)

      const createdProduct = await ProductRepoModel.findById({ _id: id })

      expect(createdProduct).toBeDefined()
    })
  })

  describe('find', () => {
    it('should return a list of products', async () => {
      const idProduct1 = await makeNewProduct(product)
      const idProduct2 = await makeNewProduct(product)

      const products = await sut.find({})

      expect(products.items).toBe(2)
      expect(products.data[0].id).toBe(idProduct1)
      expect(products.data[1].id).toBe(idProduct2)
    })
  })

  describe('findById', () => {
    it('should return an product', async () => {
      const productId = await makeNewProduct(product)

      const productFound = await sut.findById(productId)

      expect(productFound.id).toBe(productId)
    })
  })

  describe('findByIdAndUpdate', () => {
    it('should findById and update an product', async () => {
      const productId = await makeNewProduct(product)

      const productFound = await sut.findByIdAndUpdate(productId, { portion: PortionTypes.unity })

      expect(productFound.portion).toBe(PortionTypes.unity)
    })
  })

  describe('findByIdAndDelete', () => {
    it('should findById and delete an product', async () => {
      const productId = await makeNewProduct(product)
      const productsFind1 = await sut.find({})

      const productDeletedId = await sut.findByIdAndDelete(productId)
      const productsFind2 = await sut.find({})

      expect(productId).toBe(productDeletedId)
      expect(productsFind1.items).toBe(1)
      expect(productsFind2.items).toBe(0)
    })
  })
})
