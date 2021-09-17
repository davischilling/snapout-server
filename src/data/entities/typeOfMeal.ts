import { TypeOfMealData } from '@/domain/models'

export class TypeOfMeal {
  id?: string
  name: string

  constructor (
    typeOfMealData: TypeOfMealData
  ) {
    const {
      id,
      name,
    } = typeOfMealData
    if (id !== undefined) {
      this.id = id
    }
    this.name = name
  }

  static update (typeOfMeal: TypeOfMeal, params: any): TypeOfMeal {
    return new TypeOfMeal({ ...typeOfMeal, ...params })
  }
}
