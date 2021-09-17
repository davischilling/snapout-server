import { CreateRecipeService } from '@/domain/use-cases/recipe'
import { setupCreateRecipe } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'

export const makeCreateRecipe = async (): Promise<CreateRecipeService> => {
  const recipeRepo = await makeMongoDbRepository('recipe')
  return setupCreateRecipe(recipeRepo)
}
