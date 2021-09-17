export type ProductData = {
  id?: string
  name: string
  fat: number
  carbohydrate: number
  protein: number
  portion: PortionTypes
  isConsumableAlone: boolean
}

export enum PortionTypes {
  grams= '100g',
  unity= '1unit'
}
