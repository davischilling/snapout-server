import { FindProductByIdAndUpdateController } from '@/main/controllers'
import { makeFindProductByIdAndUpdate } from '@/main/factories/services'

export const makeFindProductByIdAndUpdateController = async (): Promise<FindProductByIdAndUpdateController> => {
  const findProductByIdAndUpdateService = await makeFindProductByIdAndUpdate()
  return new FindProductByIdAndUpdateController(findProductByIdAndUpdateService)
}
