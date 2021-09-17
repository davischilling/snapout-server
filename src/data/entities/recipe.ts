import { RecipeData, RecipeItemData, TypeOfMealData } from '@/domain/models'

export class Recipe {
  id?: string
  products: string[]
  meals: string[]
  
  constructor (
    recipeData: RecipeData
  ) {
    const {
      id,
      products,
      meals,
    } = recipeData
    if (id !== undefined) {
      this.id = id
    }
    this.products = products,
    this.meals = meals
  }

  static update (recipe: Recipe, params: any): Recipe {
    return new Recipe({ ...recipe, ...params })
  }
}
