import { CreateTypeOfMealService } from '@/domain/use-cases/typeOfMeal'
import { setupCreateTypeOfMeal } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'

export const makeCreateTypeOfMeal = async (): Promise<CreateTypeOfMealService> => {
  const typeOfMealRepo = await makeMongoDbRepository('typeOfMeal')
  return setupCreateTypeOfMeal(typeOfMealRepo)
}
