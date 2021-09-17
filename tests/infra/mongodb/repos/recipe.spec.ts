import { Product, Recipe, RecipeItem, TypeOfMeal } from '@/data/entities'
import { PortionTypes, ProductData, RecipeData, RecipeItemData, TypeOfMealData } from '@/domain/models'
import { ProductAttrs, ProductEntity as ProductRepoModel, RecipeAttrs, RecipeEntity as RecipeRepoModel, RecipeItemAttrs, RecipeItemEntity as RecipeItemRepoModel, TypeOfMealAttrs, TypeOfMealEntity as TypeOfMealRepoModel } from '@/infra/mongodb/entities'
import { MongoDbRepository } from '@/infra/mongodb/repos'
import { clearDatabase, closeDatabase, connect } from '@/tests/infra/mongodb/mocks'
import MongoMemoryServer from 'mongodb-memory-server-core'
import { Mongoose } from 'mongoose'


const makeNewRecipe = async (recipe: RecipeData): Promise<string> => {
  const recipeAttrs: RecipeAttrs = new Recipe(recipe)
  const newRecipe = RecipeRepoModel.build(recipeAttrs)
  const saved = await newRecipe.save()
  return saved._id.toString()
}

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

describe('MongoDbRepository', () => {
  let mongoServer: MongoMemoryServer
  let mongoOrm: Mongoose
  let recipeData: RecipeData
  let recipe: Recipe
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
    let typeOfMealData = {
      name: "Mock Meal"
    }
    const idTypeOfMeal1 = await makeNewTypeOfMeal(typeOfMealData)
    let recipeItemData = {
      productID: idProduct1,
      productYield: 2
    }
    const idRecipeItem1 = await makeNewRecipeItem(recipeItemData)
    recipeData = {
      products: [idRecipeItem1],
      meals: [idTypeOfMeal1]
    }
    recipe = new Recipe(recipeData)
  })

  afterAll(async () => {
    await closeDatabase({ mongoServer, mongoOrm })
  })

  beforeEach(async () => {
    await clearDatabase(mongoOrm.connection.collections)
    sut = await MongoDbRepository.init('@/infra/mongodb/entities', 'recipe')
  })

  describe('create', () => {
    it('should create an recipe and return an id', async () => {
      const id = await sut.create(recipe)

      const createdRecipe = await RecipeRepoModel.findById({ _id: id })

      expect(createdRecipe).toBeDefined()
    })
  })

  describe('find', () => {
    it('should return a list of recipes', async () => {
      const idRecipe1 = await makeNewRecipe(recipe)
      const idRecipe2 = await makeNewRecipe(recipe)

      const recipes = await sut.find({})

      expect(recipes.items).toBe(2)
      expect(recipes.data[0].id).toBe(idRecipe1)
      expect(recipes.data[1].id).toBe(idRecipe2)
    })

  })

  describe('findById', () => {
    it('should return an recipe', async () => {
      const recipeId = await makeNewRecipe(recipe)

      const recipeFound = await sut.findById(recipeId)

      expect(recipeFound.id).toBe(recipeId)
    })
  })

  describe('findByIdAndUpdate', () => {
    it('should findById and update an recipe', async () => {
      const recipeId = await makeNewRecipe(recipe)

      let productData = {
        name: "Mock Product",
        fat: 2,
        carbohydrate: 2,
        protein: 2,
        portion: PortionTypes.grams,
        isConsumableAlone: true
      }
      const idProduct1 = await makeNewProduct(productData)
      let recipeItemData = {
        productID: idProduct1,
        productYield: 3
      }
      const idRecipeItem1 = await makeNewRecipeItem(recipeItemData)


      const recipeFound = await sut.findByIdAndUpdate(recipeId, { products: idRecipeItem1 })

      expect(recipeFound.products.toString()).toBe([idRecipeItem1].toString())
    })
  })

  describe('findByIdAndDelete', () => {
    it('should findById and delete an recipe', async () => {
      const recipeId = await makeNewRecipe(recipe)
      const recipesFind1 = await sut.find({})

      const recipeDeletedId = await sut.findByIdAndDelete(recipeId)
      const recipesFind2 = await sut.find({})

      expect(recipeId).toBe(recipeDeletedId)
      expect(recipesFind1.items).toBe(1)
      expect(recipesFind2.items).toBe(0)
    })
  })
})
