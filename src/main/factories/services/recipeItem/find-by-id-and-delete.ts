import { FindRecipeItemByIdAndDeleteService } from '@/domain/use-cases/recipeItem'
import { setupFindRecipeItemByIdAndDelete } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'

export const makeFindRecipeItemByIdAndDelete = async (): Promise<FindRecipeItemByIdAndDeleteService> => {
  const recipeItemRepo = await makeMongoDbRepository('recipeItem')
  return setupFindRecipeItemByIdAndDelete(recipeItemRepo)
}
