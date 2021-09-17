
export type CreateTypeOfMealService = (params: CreateTypeOfMeal.Input) => Promise<CreateTypeOfMeal.Output>

export namespace CreateTypeOfMeal {
  export type TypeOfMealInputs = {
    name: string
  }
  export type Input = TypeOfMealInputs
  export type Output = { id: string } | Error
}
