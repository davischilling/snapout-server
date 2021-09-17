import { CreateRecipeItemService } from '@/domain/use-cases/recipeItem'
import { setupCreateRecipeItem } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'

export const makeCreateRecipeItem = async (): Promise<CreateRecipeItemService> => {
  const recipeItemRepo = await makeMongoDbRepository('recipeItem')
  return setupCreateRecipeItem(recipeItemRepo)
}
