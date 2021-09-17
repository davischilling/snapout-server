import { FindProductByIdAndDeleteController } from '@/main/controllers'
import { makeFindProductByIdAndDelete } from '@/main/factories/services'

export const makeFindProductByIdAndDeleteController = async (): Promise<FindProductByIdAndDeleteController> => {
  const findProductByIdAndDeleteService = await makeFindProductByIdAndDelete()
  return new FindProductByIdAndDeleteController(findProductByIdAndDeleteService)
}
