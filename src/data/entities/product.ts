import { PortionTypes, ProductData } from '@/domain/models'

export class Product {
  id?: string
  name: string
  fat: number
  carbohydrate: number
  protein: number
  portion: PortionTypes
  isConsumableAlone: boolean

  constructor (
    productData: ProductData
  ) {
    const {
      id,
      name,
      fat,
      carbohydrate,
      protein,
      portion,
      isConsumableAlone
    } = productData
    if (id !== undefined) {
      this.id = id
    }
    this.name = name
    this.fat = fat
    this.carbohydrate = carbohydrate
    this.protein = protein
    this.portion = portion
    this.isConsumableAlone = isConsumableAlone
  }

  static update (product: Product, params: any): Product {
    return new Product({ ...product, ...params })
  }
}
