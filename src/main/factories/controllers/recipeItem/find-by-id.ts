import { FindRecipeItemByIdController } from '@/main/controllers'
import { makeFindRecipeItemById } from '@/main/factories/services'

export const makeFindRecipeItemByIdController = async (): Promise<FindRecipeItemByIdController> => {
  const findRecipeItemByIdService = await makeFindRecipeItemById()
  return new FindRecipeItemByIdController(findRecipeItemByIdService)
}
