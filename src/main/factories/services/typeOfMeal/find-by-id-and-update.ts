import { FindTypeOfMealByIdAndUpdateService } from '@/domain/use-cases/typeOfMeal'
import { setupFindTypeOfMealByIdAndUpdate } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'

export const makeFindTypeOfMealByIdAndUpdate = async (): Promise<FindTypeOfMealByIdAndUpdateService> => {
  const typeOfMealRepo = await makeMongoDbRepository('typeOfMeal')
  return setupFindTypeOfMealByIdAndUpdate(typeOfMealRepo)
}
