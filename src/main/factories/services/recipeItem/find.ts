import { FindRecipeItemsService } from '@/domain/use-cases/recipeItem'
import { setupFindRecipeItems } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'

export const makeFindRecipeItems = async (): Promise<FindRecipeItemsService> => {
  const recipeItemRepo = await makeMongoDbRepository('recipeItem')
  return setupFindRecipeItems(recipeItemRepo)
}
