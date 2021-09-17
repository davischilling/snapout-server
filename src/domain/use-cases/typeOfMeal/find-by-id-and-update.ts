import { TypeOfMealData } from '@/domain/models'

export type FindTypeOfMealByIdAndUpdateService = (params: FindTypeOfMealByIdAndUpdate.Input) => Promise<FindTypeOfMealByIdAndUpdate.Output>

export namespace FindTypeOfMealByIdAndUpdate {
  export type Input = any
  export type Output = { typeOfMeal: TypeOfMealData } | Error
}
