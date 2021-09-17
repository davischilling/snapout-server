import { FindRecipeItemsController } from '@/main/controllers'
import { makeFindRecipeItems } from '@/main/factories/services'

export const makeFindRecipeItemsController = async (): Promise<FindRecipeItemsController> => {
  const findRecipeItemsService = await makeFindRecipeItems()
  return new FindRecipeItemsController(findRecipeItemsService)
}
