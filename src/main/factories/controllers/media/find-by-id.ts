import { FindMediaByIdController } from '@/main/controllers'
import { makeFindMediaById } from '@/main/factories/services'

export const makeFindMediaByIdController = async (): Promise<FindMediaByIdController> => {
  const findMediaByIdService = await makeFindMediaById()
  return new FindMediaByIdController(findMediaByIdService)
}
