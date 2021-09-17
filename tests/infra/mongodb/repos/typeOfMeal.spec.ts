import { TypeOfMeal } from '@/data/entities'
import { TypeOfMealData } from '@/domain/models'
import { TypeOfMealAttrs, TypeOfMealEntity as TypeOfMealRepoModel } from '@/infra/mongodb/entities'
import { MongoDbRepository } from '@/infra/mongodb/repos'
import { clearDatabase, closeDatabase, connect } from '@/tests/infra/mongodb/mocks'
import MongoMemoryServer from 'mongodb-memory-server-core'
import { Mongoose } from 'mongoose'


const makeNewTypeOfMeal = async (typeOfMeal: TypeOfMealData): Promise<string> => {
  const typeOfMealAttrs: TypeOfMealAttrs = new TypeOfMeal(typeOfMeal)
  const newTypeOfMeal = TypeOfMealRepoModel.build(typeOfMealAttrs)
  const saved = await newTypeOfMeal.save()
  return saved._id.toString()
}

describe('MongoDbRepository', () => {
  let mongoServer: MongoMemoryServer
  let mongoOrm: Mongoose
  let typeOfMealData: TypeOfMealData
  let typeOfMeal: TypeOfMeal
  let sut: MongoDbRepository

  beforeAll(async () => {
    typeOfMealData = {
      name: "Mock Product"
    }
    typeOfMeal = new TypeOfMeal(typeOfMealData)
    const db = await connect()
    mongoServer = db.mongoServer
    mongoOrm = db.mongoOrm
  })

  afterAll(async () => {
    await closeDatabase({ mongoServer, mongoOrm })
  })

  beforeEach(async () => {
    await clearDatabase(mongoOrm.connection.collections)
    sut = await MongoDbRepository.init('@/infra/mongodb/entities', 'typeOfMeal')
  })

  describe('create', () => {
    it('should create an typeOfMeal and return an id', async () => {
      const id = await sut.create(typeOfMeal)

      const createdTypeOfMeal = await TypeOfMealRepoModel.findById({ _id: id })

      expect(createdTypeOfMeal).toBeDefined()
    })
  })

  describe('find', () => {
    it('should return a list of typeOfMeals', async () => {
      const idTypeOfMeal1 = await makeNewTypeOfMeal(typeOfMeal)
      const idTypeOfMeal2 = await makeNewTypeOfMeal(typeOfMeal)

      const typeOfMeals = await sut.find({})

      expect(typeOfMeals.items).toBe(2)
      expect(typeOfMeals.data[0].id).toBe(idTypeOfMeal1)
      expect(typeOfMeals.data[1].id).toBe(idTypeOfMeal2)
    })

  })

  describe('findById', () => {
    it('should return an typeOfMeal', async () => {
      const typeOfMealId = await makeNewTypeOfMeal(typeOfMeal)

      const typeOfMealFound = await sut.findById(typeOfMealId)

      expect(typeOfMealFound.id).toBe(typeOfMealId)
    })
  })

  describe('findByIdAndUpdate', () => {
    it('should findById and update an typeOfMeal', async () => {
      const typeOfMealId = await makeNewTypeOfMeal(typeOfMeal)

      const typeOfMealFound = await sut.findByIdAndUpdate(typeOfMealId, { name: "Mock Product" })

      expect(typeOfMealFound.name).toBe("Mock Product")
    })
  })

  describe('findByIdAndDelete', () => {
    it('should findById and delete an typeOfMeal', async () => {
      const typeOfMealId = await makeNewTypeOfMeal(typeOfMeal)
      const typeOfMealsFind1 = await sut.find({})

      const typeOfMealDeletedId = await sut.findByIdAndDelete(typeOfMealId)
      const typeOfMealsFind2 = await sut.find({})

      expect(typeOfMealId).toBe(typeOfMealDeletedId)
      expect(typeOfMealsFind1.items).toBe(1)
      expect(typeOfMealsFind2.items).toBe(0)
    })
  })
})
