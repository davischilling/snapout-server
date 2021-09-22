import { FindMediaByIdAndUpdateController } from '@/main/controllers'
import { makeFindMediaByIdAndUpdate } from '@/main/factories/services'

export const makeFindMediaByIdAndUpdateController = async (): Promise<FindMediaByIdAndUpdateController> => {
  const findMediaByIdAndUpdateService = await makeFindMediaByIdAndUpdate()
  return new FindMediaByIdAndUpdateController(findMediaByIdAndUpdateService)
}
