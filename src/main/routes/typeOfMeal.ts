import { adaptExpressRoute as adapt } from '@/main/adapters'
import {
  makeCreateTypeOfMealController,
  makeFindTypeOfMealsController,
  makeFindTypeOfMealByIdController,
  makeFindTypeOfMealByIdAndUpdateController,
  makeFindTypeOfMealByIdAndDeleteController
} from '@/main/factories/controllers'

import { Router } from 'express'

export default async (router: Router): Promise<void> => {
  router.post('/typeOfMeals', adapt(await makeCreateTypeOfMealController()))
  router.get('/typeOfMeals', adapt(await makeFindTypeOfMealsController()))
  router.get('/typeOfMeals/:id', adapt(await makeFindTypeOfMealByIdController()))
  router.patch('/typeOfMeals/:id', adapt(await makeFindTypeOfMealByIdAndUpdateController()))
  router.delete('/typeOfMeals/:id', adapt(await makeFindTypeOfMealByIdAndDeleteController()))
}
