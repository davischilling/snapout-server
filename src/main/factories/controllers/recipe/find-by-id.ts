import { FindRecipeByIdController } from '@/main/controllers'
import { makeFindRecipeById } from '@/main/factories/services'

export const makeFindRecipeByIdController = async (): Promise<FindRecipeByIdController> => {
  const findRecipeByIdService = await makeFindRecipeById()
  return new FindRecipeByIdController(findRecipeByIdService)
}
