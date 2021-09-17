import { FindRecipeByIdAndDeleteController } from '@/main/controllers'
import { makeFindRecipeByIdAndDelete } from '@/main/factories/services'

export const makeFindRecipeByIdAndDeleteController = async (): Promise<FindRecipeByIdAndDeleteController> => {
  const findRecipeByIdAndDeleteService = await makeFindRecipeByIdAndDelete()
  return new FindRecipeByIdAndDeleteController(findRecipeByIdAndDeleteService)
}
