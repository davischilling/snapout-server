import { FindRecipeItemByIdAndUpdateController } from '@/main/controllers'
import { makeFindRecipeItemByIdAndUpdate } from '@/main/factories/services'

export const makeFindRecipeItemByIdAndUpdateController = async (): Promise<FindRecipeItemByIdAndUpdateController> => {
  const findRecipeItemByIdAndUpdateService = await makeFindRecipeItemByIdAndUpdate()
  return new FindRecipeItemByIdAndUpdateController(findRecipeItemByIdAndUpdateService)
}
