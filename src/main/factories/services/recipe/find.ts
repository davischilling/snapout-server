import { FindRecipesService } from '@/domain/use-cases/recipe'
import { setupFindRecipes } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'

export const makeFindRecipes = async (): Promise<FindRecipesService> => {
  const recipeRepo = await makeMongoDbRepository('recipe')
  return setupFindRecipes(recipeRepo)
}
