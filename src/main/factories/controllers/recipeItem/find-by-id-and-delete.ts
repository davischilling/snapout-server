import { FindRecipeItemByIdAndDeleteController } from '@/main/controllers'
import { makeFindRecipeItemByIdAndDelete } from '@/main/factories/services'

export const makeFindRecipeItemByIdAndDeleteController = async (): Promise<FindRecipeItemByIdAndDeleteController> => {
  const findRecipeItemByIdAndDeleteService = await makeFindRecipeItemByIdAndDelete()
  return new FindRecipeItemByIdAndDeleteController(findRecipeItemByIdAndDeleteService)
}
