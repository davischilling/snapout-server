import { FindTypeOfMealsService } from '@/domain/use-cases/typeOfMeal'
import { setupFindTypeOfMeals } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'

export const makeFindTypeOfMeals = async (): Promise<FindTypeOfMealsService> => {
  const typeOfMealRepo = await makeMongoDbRepository('typeOfMeal')
  return setupFindTypeOfMeals(typeOfMealRepo)
}
