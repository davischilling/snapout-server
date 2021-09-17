import { TypeOfMealData } from '@/domain/models'

export type FindTypeOfMealsService = (params: FindTypeOfMeals.Input) => Promise<FindTypeOfMeals.Output>

export namespace FindTypeOfMeals {
  export type Input = any
  export type Output = { items: number, data: TypeOfMealData[] } | Error
}
