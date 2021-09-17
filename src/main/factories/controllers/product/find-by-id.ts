import { FindProductByIdController } from '@/main/controllers'
import { makeFindProductById } from '@/main/factories/services'

export const makeFindProductByIdController = async (): Promise<FindProductByIdController> => {
  const findProductByIdService = await makeFindProductById()
  return new FindProductByIdController(findProductByIdService)
}
