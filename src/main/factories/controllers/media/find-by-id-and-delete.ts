import { FindMediaByIdAndDeleteController } from '@/main/controllers'
import { makeFindMediaByIdAndDelete } from '@/main/factories/services'

export const makeFindMediaByIdAndDeleteController = async (): Promise<FindMediaByIdAndDeleteController> => {
  const findMediaByIdAndDeleteService = await makeFindMediaByIdAndDelete()
  return new FindMediaByIdAndDeleteController(findMediaByIdAndDeleteService)
}
