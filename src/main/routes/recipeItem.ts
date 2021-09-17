import { adaptExpressRoute as adapt } from '@/main/adapters'
import {
  makeCreateRecipeItemController,
  makeFindRecipeItemsController,
  makeFindRecipeItemByIdController,
  makeFindRecipeItemByIdAndUpdateController,
  makeFindRecipeItemByIdAndDeleteController
} from '@/main/factories/controllers'

import { Router } from 'express'

export default async (router: Router): Promise<void> => {
  router.post('/recipeItems', adapt(await makeCreateRecipeItemController()))
  router.get('/recipeItems', adapt(await makeFindRecipeItemsController()))
  router.get('/recipeItems/:id', adapt(await makeFindRecipeItemByIdController()))
  router.patch('/recipeItems/:id', adapt(await makeFindRecipeItemByIdAndUpdateController()))
  router.delete('/recipeItems/:id', adapt(await makeFindRecipeItemByIdAndDeleteController()))
}
