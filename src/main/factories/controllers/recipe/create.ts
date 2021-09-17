import { CreateRecipeController } from '@/main/controllers'
import { makeCreateRecipe } from '@/main/factories/services'

export const makeCreateRecipeController = async (): Promise<CreateRecipeController> => {
  const createRecipeService = await makeCreateRecipe()
  return new CreateRecipeController(createRecipeService)
}
