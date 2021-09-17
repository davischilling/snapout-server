import { ProductData, RecipeItemData } from '@/domain/models'

export class RecipeItem {
  id?: string
  productID: string
  productYield: number

  constructor(
    recipeItemData: RecipeItemData
  ) {
    const {
      id,
      productID,
      productYield,
    } = recipeItemData
    if (id !== undefined) {
      this.id = id
    }
    this.productID = productID,
      this.productYield = productYield
  }

  static update(recipeItem: RecipeItem, params: any): RecipeItem {
    return new RecipeItem({ ...recipeItem, ...params })
  }
}
