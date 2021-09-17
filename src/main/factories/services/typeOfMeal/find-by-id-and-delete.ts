import { FindTypeOfMealByIdAndDeleteService } from '@/domain/use-cases/typeOfMeal'
import { setupFindTypeOfMealByIdAndDelete } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'

export const makeFindTypeOfMealByIdAndDelete = async (): Promise<FindTypeOfMealByIdAndDeleteService> => {
  const typeOfMealRepo = await makeMongoDbRepository('typeOfMeal')
  return setupFindTypeOfMealByIdAndDelete(typeOfMealRepo)
}
