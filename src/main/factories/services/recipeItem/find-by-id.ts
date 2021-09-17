import { FindRecipeItemByIdService } from '@/domain/use-cases/recipeItem'
import { setupFindRecipeItemById } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'

export const makeFindRecipeItemById = async (): Promise<FindRecipeItemByIdService> => {
  const recipeItemRepo = await makeMongoDbRepository('recipeItem')
  return setupFindRecipeItemById(recipeItemRepo)
}
