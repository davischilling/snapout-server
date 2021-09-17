import { FindRecipeByIdAndDeleteService } from '@/domain/use-cases/recipe'
import { setupFindRecipeByIdAndDelete } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'

export const makeFindRecipeByIdAndDelete = async (): Promise<FindRecipeByIdAndDeleteService> => {
  const recipeRepo = await makeMongoDbRepository('recipe')
  return setupFindRecipeByIdAndDelete(recipeRepo)
}
