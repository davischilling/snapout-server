import { FindRecipeItemByIdAndUpdateService } from '@/domain/use-cases/recipeItem'
import { setupFindRecipeItemByIdAndUpdate } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'

export const makeFindRecipeItemByIdAndUpdate = async (): Promise<FindRecipeItemByIdAndUpdateService> => {
  const recipeItemRepo = await makeMongoDbRepository('recipeItem')
  return setupFindRecipeItemByIdAndUpdate(recipeItemRepo)
}
