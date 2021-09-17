import { FindRecipeByIdService } from '@/domain/use-cases/recipe'
import { setupFindRecipeById } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'

export const makeFindRecipeById = async (): Promise<FindRecipeByIdService> => {
  const recipeRepo = await makeMongoDbRepository('recipe')
  return setupFindRecipeById(recipeRepo)
}
