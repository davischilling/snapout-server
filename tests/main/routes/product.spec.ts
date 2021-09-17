import { app } from '@/main/config/app'
import { clearDatabase, closeDatabase, connect } from '@/tests/infra/mongodb/mocks'
import { signUpSetup } from '@/tests/main/routes/setup'
import { ProductEntity as ProductRepoModel, ProductAttrs } from '@/infra/mongodb/entities'
import { Product } from '@/data/entities'
import { PortionTypes, ProductData } from '@/domain/models'

import MongoMemoryServer from 'mongodb-memory-server-core'
import { Mongoose } from 'mongoose'
import request from 'supertest'

const makeNewProduct = async (product: ProductData): Promise<string> => {
  const productAttrs: ProductAttrs = new Product(product)
  const newProduct = ProductRepoModel.build(productAttrs)
  const saved = await newProduct.save()
  return saved._id.toString()
}

describe('Product Routes', () => {
  let mongoServer: MongoMemoryServer
  let mongoOrm: Mongoose
  let product: ProductData
  let accessToken: string

  beforeAll(async () => {
    const db = await connect()
    mongoServer = db.mongoServer
    mongoOrm = db.mongoOrm
  })

  beforeEach(async () => {
    const { accessToken: token } = await signUpSetup({
      email: 'test@test.com', password: '1234'
    })
    accessToken = token
    product = {
      name: 'any_name',
      fat: 10,
      carbohydrate: 10,
      protein: 10,
      portion: PortionTypes.grams,
      isConsumableAlone: true
    }
  })

  afterEach(async () => {
    await clearDatabase(mongoOrm.connection.collections)
  })

  afterAll(async () => {
    await closeDatabase({ mongoServer, mongoOrm })
  })

  it('POST /api/products - should return 201 with the new product ID', async () => {
    const { status, body } = await request(app)
      .post('/api/products')
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)
      .send(product)

    expect(status).toBe(201)
    expect(body.id).toBeDefined()
  })

  it('GET /api/products - should return 200 with the number of returned items and list of products', async () => {
    const productId1 = await makeNewProduct(product)
    const productId2 = await makeNewProduct(product)

    const { status, body } = await request(app)
      .get('/api/products')
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)

    expect(status).toBe(200)
    expect(body.items).toBe(2)
    expect(body.data[0].id).toBe(productId1)
    expect(body.data[1].id).toBe(productId2)
    expect(body.data[2]).toBeUndefined()
  })

  it('GET /api/products/:id - should return 200 with product', async () => {
    const productId1 = await makeNewProduct(product)

    const { status, body } = await request(app)
      .get(`/api/products/${productId1}`)
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)

    expect(status).toBe(200)
    expect(body.id).toBe(productId1)
  })

  it('PATCH /api/products/:id - should return 200 with updated product', async () => {
    const productId1 = await makeNewProduct(product)

    const { status, body } = await request(app)
      .patch(`/api/products/${productId1}`)
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)
      .send({ name: 'new_name' })

    expect(status).toBe(200)
    expect(body.id).toBe(productId1)
    expect(body.name).toBe('new_name')
  })

  it('DELETE /api/products/:id - should return 200 with updated product', async () => {
    const productId1 = await makeNewProduct(product)

    const { status, body } = await request(app)
      .delete(`/api/products/${productId1}`)
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)

    expect(status).toBe(200)
    expect(body.id).toBe(productId1)

    const findProduct = await ProductRepoModel.findById({ _id: productId1 })

    expect(findProduct).toBe(null)
  })
})
