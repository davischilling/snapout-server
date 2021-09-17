import { FindRecipesController } from '@/main/controllers'
import { makeFindRecipes } from '@/main/factories/services'

export const makeFindRecipesController = async (): Promise<FindRecipesController> => {
  const findRecipesService = await makeFindRecipes()
  return new FindRecipesController(findRecipesService)
}
