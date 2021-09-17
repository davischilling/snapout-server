import { adaptExpressRoute as adapt } from '@/main/adapters'
import {
  makeCreateRecipeController,
  makeFindRecipesController,
  makeFindRecipeByIdController,
  makeFindRecipeByIdAndUpdateController,
  makeFindRecipeByIdAndDeleteController
} from '@/main/factories/controllers'

import { Router } from 'express'

export default async (router: Router): Promise<void> => {
  router.post('/recipes', adapt(await makeCreateRecipeController()))
  router.get('/recipes', adapt(await makeFindRecipesController()))
  router.get('/recipes/:id', adapt(await makeFindRecipeByIdController()))
  router.patch('/recipes/:id', adapt(await makeFindRecipeByIdAndUpdateController()))
  router.delete('/recipes/:id', adapt(await makeFindRecipeByIdAndDeleteController()))
}
