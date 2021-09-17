import { ProductData } from '@/domain/models'

export type FindProductByIdService = (params: FindProductById.Input) => Promise<FindProductById.Output>

export namespace FindProductById {
  export type Input = { id: string }
  export type Output = { product: ProductData } | Error
}
