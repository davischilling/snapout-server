import { TypeOfMealData } from '@/domain/models'

export type FindTypeOfMealByIdService = (params: FindTypeOfMealById.Input) => Promise<FindTypeOfMealById.Output>

export namespace FindTypeOfMealById {
  export type Input = { id: string }
  export type Output = { typeOfMeal: TypeOfMealData } | Error
}
