import { ProductData } from '@/domain/models'

export type FindProductsService = (params: FindProducts.Input) => Promise<FindProducts.Output>

export namespace FindProducts {
  export type Input = any
  export type Output = { items: number, data: ProductData[] } | Error
}
