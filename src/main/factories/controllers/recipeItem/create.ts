import { CreateRecipeItemController } from '@/main/controllers'
import { makeCreateRecipeItem } from '@/main/factories/services'

export const makeCreateRecipeItemController = async (): Promise<CreateRecipeItemController> => {
  const createRecipeItemService = await makeCreateRecipeItem()
  return new CreateRecipeItemController(createRecipeItemService)
}
