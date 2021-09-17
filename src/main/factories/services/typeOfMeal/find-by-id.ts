import { FindTypeOfMealByIdService } from '@/domain/use-cases/typeOfMeal'
import { setupFindTypeOfMealById } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'

export const makeFindTypeOfMealById = async (): Promise<FindTypeOfMealByIdService> => {
  const typeOfMealRepo = await makeMongoDbRepository('typeOfMeal')
  return setupFindTypeOfMealById(typeOfMealRepo)
}
