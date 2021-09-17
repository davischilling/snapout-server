import { FindRecipeByIdAndUpdateController } from '@/main/controllers'
import { makeFindRecipeByIdAndUpdate } from '@/main/factories/services'

export const makeFindRecipeByIdAndUpdateController = async (): Promise<FindRecipeByIdAndUpdateController> => {
  const findRecipeByIdAndUpdateService = await makeFindRecipeByIdAndUpdate()
  return new FindRecipeByIdAndUpdateController(findRecipeByIdAndUpdateService)
}
