import { ProductData } from '@/domain/models'

export type FindProductByIdAndUpdateService = (params: FindProductByIdAndUpdate.Input) => Promise<FindProductByIdAndUpdate.Output>

export namespace FindProductByIdAndUpdate {
  export type Input = any
  export type Output = { product: ProductData } | Error
}
