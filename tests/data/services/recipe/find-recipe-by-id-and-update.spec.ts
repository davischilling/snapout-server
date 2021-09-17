import { FindRecipeByIdAndUpdateService } from '@/domain/use-cases/recipe'
import { ProductData, TypeOfMealData, RecipeData, RecipeItemData, PortionTypes } from '@/domain/models'
import { Repository as RecipeDbRepo } from '@/data/contracts/repos'
import { ProductEntity as ProductRepoModel, ProductAttrs } from '@/infra/mongodb/entities'
import { RecipeItemAttrs, RecipeItemEntity as RecipeItemRepoModel } from '@/infra/mongodb/entities'
import { TypeOfMealAttrs, TypeOfMealEntity as TypeOfMealRepoModel } from '@/infra/mongodb/entities'
import { setupFindRecipeByIdAndUpdate } from '@/data/services'
import { RecipeItem, Recipe, Product, TypeOfMeal } from '@/data/entities'

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

jest.mock('@/data/entities/recipe')

describe('FindRecipeByIdAndUpdateService', () => {
  let mongoServer: MongoMemoryServer
  let mongoOrm: Mongoose
  let id: string
  let recipeAccountId: string
  let recipe: RecipeData
  let recipeAccountRepo: MockProxy<RecipeDbRepo>
  let spyRecipe: any
  let mockUpdatedRecipe: Recipe
  let sut: FindRecipeByIdAndUpdateService

  beforeAll(async () => {
    const db = await connect()
    mongoServer = db.mongoServer
    mongoOrm = db.mongoOrm
    id = new mongoose.Types.ObjectId().toHexString()
    recipeAccountId = new mongoose.Types.ObjectId().toHexString()
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
    recipe = {
      id,
      products: [idRecipeItem1],
      meals: [idTypeOfMeal1]
    }
    recipeAccountRepo = mock()
    recipeAccountRepo.findById.mockResolvedValue(recipe)
    mockUpdatedRecipe = new Recipe(recipe)
    spyRecipe = jest.spyOn(Recipe, 'update').mockReturnValue(mockUpdatedRecipe)
  })

  beforeEach(() => {
    sut = setupFindRecipeByIdAndUpdate(recipeAccountRepo)
  })

  afterAll(async () => {
    await closeDatabase({ mongoServer, mongoOrm })
  })

  it('should call RecipeAccountRepo.findById with correct params', async () => {
    await sut({ data: 'any_data', id })

    expect(recipeAccountRepo.findById).toHaveBeenCalledWith(id)
    expect(recipeAccountRepo.findById).toHaveBeenCalledTimes(1)
  })

  it('should call Recipe entity update method with correct params', async () => {
    await sut({ data: 'any_data', id })

    expect(spyRecipe).toHaveBeenCalledWith(recipe, { data: 'any_data', id })
    expect(spyRecipe).toHaveBeenCalledTimes(1)
  })

  it('should call RecipeAccountRepo.findByIdAndUpdate with correct params', async () => {
    await sut({ data: 'any_data', id })

    expect(recipeAccountRepo.findByIdAndUpdate).toHaveBeenCalledWith(id, mockUpdatedRecipe)
    expect(recipeAccountRepo.findByIdAndUpdate).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if RecipeAccountRepo.findByIdAndUpdate throws', async () => {
    recipeAccountRepo.findByIdAndUpdate.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({ data: 'any_data', id })

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })

  it('should return an updated recipe on success', async () => {
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
    mockUpdatedRecipe.products = [idRecipeItem1]
    recipeAccountRepo.findByIdAndUpdate.mockResolvedValueOnce(mockUpdatedRecipe)

    const recipeFindByIdResult = await sut({ products: [idRecipeItem1], id })

    expect(recipeFindByIdResult).toEqual(mockUpdatedRecipe)
  })
})
