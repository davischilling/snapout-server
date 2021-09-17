import { PortionTypes } from '@/domain/models'

export type CreateProductService = (params: CreateProduct.input) => Promise<CreateProduct.output>

export namespace CreateProduct {
  export type ProductInputs = {
    name: string
    fat: number
    carbohydrate: number
    protein: number
    portion: PortionTypes
    isConsumableAlone: boolean
  }
  export type input = ProductInputs
  export type output = { id: string } | Error
}
