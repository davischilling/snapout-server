import { FindRecipeByIdAndUpdateService } from '@/domain/use-cases/recipe'
import { setupFindRecipeByIdAndUpdate } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'

export const makeFindRecipeByIdAndUpdate = async (): Promise<FindRecipeByIdAndUpdateService> => {
  const recipeRepo = await makeMongoDbRepository('recipe')
  return setupFindRecipeByIdAndUpdate(recipeRepo)
}
